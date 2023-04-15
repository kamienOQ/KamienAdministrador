import { collection, doc, getDocs, limit, orderBy, query, setDoc, startAfter, where } from "firebase/firestore/lite";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { FirebaseDB, FirebaseStorage } from "../../firebase/config";
import { onChangeSavingNewCategory, onAddImage, onAddIcon, onAddSuccessMessage, onAddErrorMessage, 
    onCleanCategories, onAddCategoryAtStart, onSetCategories, onSetNumberCategories, onAddCategoryNameLowerCase, onUpdateCategory, onChangeActive } from "./";


export const onStartUploadFile = (file, type, collectionName) => {
  return async (dispatch) => {
    if ( file ){
      dispatch(onChangeSavingNewCategory(true));
      const id = Math.random().toString(36).substring(2) + Date.now().toString(36);
      let imgId = id+collectionName+file.name;
      const storageRef = ref(FirebaseStorage, imgId);

      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      if(type === 'image'){
        dispatch( onAddImage( [imgId, downloadURL] ) );
      }else{
        dispatch( onAddIcon( [imgId, downloadURL] ) );
      }
      dispatch(onChangeSavingNewCategory(false));
    }
  }
}

export const onStartUploadNewCategory = () => {
  return async (dispatch, getState) => {
    
    let duplicateCategory = false;
    dispatch(onAddCategoryNameLowerCase());
    const { activeCategory, categories, pageSize, page } = getState().categories;

    dispatch(onChangeSavingNewCategory(true));

    const collectionRef = collection(FirebaseDB, `/categories`);
    const q = query( collectionRef );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const { categoryName } = doc.data();
      if( categoryName.toLowerCase() === activeCategory.categoryName.toLowerCase() ){
        duplicateCategory = true;
        dispatch(onAddErrorMessage( 'Ya existe una categoría con este nombre' ));
        dispatch(onAddSuccessMessage( '' ));
      }
    });
    if(!duplicateCategory){
        const newDoc = doc(collectionRef);
        const setDocResp = await setDoc(newDoc, activeCategory);
        if(page === 0){
          let categoriesArray = [...categories];
          categoriesArray = categoriesArray.map((object) => {
            return { ...object, id: object.id + 1 }
          });
          if(categories.length < pageSize){
            dispatch(onSetCategories(categoriesArray));
          }if(categories.length === pageSize){
            categoriesArray.pop();
            dispatch(onSetCategories(categoriesArray));
          }
          dispatch(onAddCategoryAtStart( {id: 1, ...activeCategory} ));
        }
        
        dispatch(onAddSuccessMessage( 'Agregado correctamente' ));
        dispatch(onAddErrorMessage( '' ));
    }
    dispatch(onChangeSavingNewCategory(false));
  }
}


export const onStartGetCategories = (page = 0, size = 5) => {
  return async (dispatch) => {
    dispatch(onCleanCategories());

    const collectionRef = collection(FirebaseDB, `/categories`);
    let q;

    if (page === 0) {
      q = query( collectionRef, orderBy("date", "desc"), limit(size) );
    } else {
      const lastVisibleDoc = query( collectionRef,  orderBy("date", "desc"), limit(page * size) );
      const lastVisibleDocSnapshot = await getDocs(lastVisibleDoc);
      const lastVisible = lastVisibleDocSnapshot.docs[lastVisibleDocSnapshot.docs.length-1];
      q = query( collectionRef,  orderBy("date", "desc"), startAfter(lastVisible), limit(size) );
    }

    const querySnapshot = await getDocs(q);

    const newCategories = querySnapshot.docs.map((doc, index) => {
      return { id: index + 1 + page * size, ...doc.data() };
    });
    dispatch(onSetCategories(newCategories));
    
  }
}


export const onStartFilterCategories = (page = 0, size = 5, preValue) => {
  return async (dispatch, getState) => {
    const { filter } = getState().categories;
    if (!filter) return;
    const { field, value } = filter;
    dispatch(onCleanCategories());
    const collectionRef = collection(FirebaseDB, `/categories`);
    let q, undersized = false;

    if(field?.toLowerCase().includes('name')){
      if(value!=='asc' && value !== 'desc'){
        const formattedName = value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        if(preValue !== value){
          q = query( collectionRef, where('categoryNameLowerCase', '>=', formattedName), where('categoryNameLowerCase', '<', formattedName + '\uf8ff'));
          const querySnapshot = await getDocs(q);
          undersized = (querySnapshot.size <= size) ? true : false;
          dispatch(onSetNumberCategories(querySnapshot.size));
        } if (page === 0 || undersized) {
          q = query( collectionRef, where('categoryNameLowerCase', '>=', formattedName), where('categoryNameLowerCase', '<', formattedName + '\uf8ff'), limit(size) );
        } else {
          const lastVisibleDoc = query( collectionRef,  where('categoryNameLowerCase', '>=', formattedName), where('categoryNameLowerCase', '<', formattedName + '\uf8ff'), limit(page * size) );
          const lastVisibleDocSnapshot = await getDocs(lastVisibleDoc);
          const lastVisible = lastVisibleDocSnapshot.docs[lastVisibleDocSnapshot.docs.length-1];
          q = query( collectionRef,  where('categoryNameLowerCase', '>=', formattedName), where('categoryNameLowerCase', '<', formattedName + '\uf8ff'), startAfter(lastVisible), limit(size) );
        }
      }else{
        if (page === 0) {
          q = query( collectionRef, orderBy("categoryNameLowerCase", value), limit(size) );
          dispatch(onStartNumberCategories());
        } else {
          const lastVisibleDoc = query( collectionRef,  orderBy("categoryNameLowerCase", value), limit(page * size) );
          const lastVisibleDocSnapshot = await getDocs(lastVisibleDoc);
          const lastVisible = lastVisibleDocSnapshot.docs[lastVisibleDocSnapshot.docs.length-1];
          q = query( collectionRef,  orderBy("categoryNameLowerCase", value), startAfter(lastVisible), limit(size) );
        }
      }
    }
    if(field?.toLowerCase().includes('date')){
      const dateObject = new Date(value)
      if(preValue !== value){
        q = query( collectionRef, where("date", ">=", dateObject.getTime()));
        const querySnapshot = await getDocs(q);
        undersized = (querySnapshot.size <= size) ? true : false;
        dispatch(onSetNumberCategories(querySnapshot.size));
      } if (page === 0 || undersized) {
        q = query( collectionRef, where("date", ">=", dateObject.getTime()), limit(size) );
      } else {
        const lastVisibleDoc = query( collectionRef,  where("date", ">=", dateObject.getTime()), limit(page * size) );
        const lastVisibleDocSnapshot = await getDocs(lastVisibleDoc);
        const lastVisible = lastVisibleDocSnapshot.docs[lastVisibleDocSnapshot.docs.length-1];
        q = query( collectionRef,  where("date", ">=", dateObject.getTime()), startAfter(lastVisible), limit(size) );
      }
    }

    const querySnapshot = await getDocs(q);
    const newCategories = querySnapshot.docs.map((doc, index) => {
      return { id: index + 1 + page * size, ...doc.data() };
    });

    dispatch(onSetCategories(newCategories));
  }
}


export const onStartNumberCategories = () => {
  return async (dispatch) => {
    const collectionRef = collection(FirebaseDB, `/categories`);
    const querySnapshot = await getDocs(collectionRef);

    const numCategories = querySnapshot.size;
    dispatch(onSetNumberCategories(numCategories));
  }
}

export const onStartUpdateCategory = () => {
  return async( dispatch, getState ) => {

      let duplicateCategory = false;
      dispatch(onAddCategoryNameLowerCase());
      dispatch(onChangeSavingNewCategory(true));
      const { activeCategory, preCategory } = getState().categories;

    let q;  
    const collectionRef = collection(FirebaseDB, `/categories`);
    q = query( collectionRef );
    const querySnapshot = await getDocs(q);

    if(preCategory.updatedName && activeCategory.categoryName !== preCategory.name){
      querySnapshot.forEach((doc) => {
        const { categoryName } = doc.data();
        if( categoryName.toLowerCase() === activeCategory.categoryName.toLowerCase() ){
          duplicateCategory = true;
          dispatch(onAddErrorMessage( 'Ya existe una categoría con este nombre' ));
          dispatch(onAddSuccessMessage( '' ));
        }
      });
    }

    if(!duplicateCategory){
      q = query(collectionRef, where('categoryName', '==', preCategory.name));
      const querySnapshot = await getDocs(q);
      let docRef;

      const categoryToFireStore = { ...activeCategory };
      delete categoryToFireStore.id;

      if (querySnapshot.size === 1) {
        docRef = querySnapshot.docs[0].ref;
      }
  
      await setDoc( docRef, categoryToFireStore, { merge: true } )
      dispatch( onUpdateCategory( activeCategory ) );
      dispatch(onAddSuccessMessage( 'Editado correctamente' ));
      dispatch(onAddErrorMessage( '' ));
    }
      
  }
}

export const onStartChangeActive = () => {
  return async( dispatch, getState ) => {

    dispatch(onChangeSavingNewCategory(true));
    const { activeCategory } = getState().categories;

    let q;  
    const collectionRef = collection(FirebaseDB, `/categories`);

    q = query(collectionRef, where('categoryName', '==', activeCategory.categoryName));
    const querySnapshot = await getDocs(q);
    let docRef;

    const categoryToFireStore = { ...activeCategory };
    delete categoryToFireStore.id;

    if (querySnapshot.size === 1) {
      docRef = querySnapshot.docs[0].ref;
    }

    await setDoc( docRef, categoryToFireStore, { merge: true } );
    dispatch(onChangeSavingNewCategory(false));   
  }
}