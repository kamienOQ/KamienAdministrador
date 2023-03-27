import { collection, doc, getDocs, limit, orderBy, query, setDoc, startAfter, where } from "firebase/firestore/lite";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { FirebaseDB, FirebaseStorage } from "../../firebase/config";
import { onChangeSavingNewCategory, onAddImage, onAddIcon, onAddSuccessMessage, onAddErrorMessage, 
    onCleanCategories, onAddCategoryAtStart, onSetCategories, onSetNumberCategories, onAddCategoryNameLowerCase, onUpdateCategory, onChangeActive } from "./";


export const onStartUploadFile = (file, type, collectionName) => {
  return async (dispatch) => {
    if ( file ){
      let imgId = collectionName+file.name;
      const storageRef = ref(FirebaseStorage, imgId);

      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      if(type === 'image'){
        dispatch( onAddImage( [imgId, downloadURL] ) );
      }else{
        dispatch( onAddIcon( [imgId, downloadURL] ) );
      }
    }
  }
}

export const onStartUploadNewCategory = () => {
  return async (dispatch, getState) => {
    
    let duplicateCategory = false;
    dispatch(onAddCategoryNameLowerCase());
    const { activeCategory, categories, pageSize } = getState().categories;

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
    if(!!filter){
      const { field, value } = filter;
      dispatch(onCleanCategories());
      const collectionRef = collection(FirebaseDB, `/categories`);
      let q;
      if(field?.toLowerCase().includes('name')){
        if(value==='asc'){
          if (page === 0) {
            q = query( collectionRef, orderBy("categoryNameLowerCase", "asc"), limit(size) );
          } else {
            const lastVisibleDoc = query( collectionRef,  orderBy("categoryNameLowerCase", "asc"), limit(page * size) );
            const lastVisibleDocSnapshot = await getDocs(lastVisibleDoc);
            const lastVisible = lastVisibleDocSnapshot.docs[lastVisibleDocSnapshot.docs.length-1];
            q = query( collectionRef,  orderBy("categoryNameLowerCase", "asc"), startAfter(lastVisible), limit(size) );
          }
        }if(value==='desc'){
          if (page === 0) {
            q = query( collectionRef, orderBy("categoryNameLowerCase", "desc"), limit(size) );
          } else {
            const lastVisibleDoc = query( collectionRef,  orderBy("categoryNameLowerCase", "desc"), limit(page * size) );
            const lastVisibleDocSnapshot = await getDocs(lastVisibleDoc);
            const lastVisible = lastVisibleDocSnapshot.docs[lastVisibleDocSnapshot.docs.length-1];
            q = query( collectionRef,  orderBy("categoryNameLowerCase", "desc"), startAfter(lastVisible), limit(size) );
          }
        }if(value!=='asc' && value !== 'desc'){
          if(preValue !== value){
            q = query( collectionRef, where('categoryNameLowerCase', '>=', value.toLowerCase()), where('categoryNameLowerCase', '<', value.toLowerCase() + '\uf8ff'));
            const querySnapshot = await getDocs(q);
            dispatch(onSetNumberCategories(querySnapshot.size));
          } if (page === 0) {
            q = query( collectionRef, where('categoryNameLowerCase', '>=', value.toLowerCase()), where('categoryNameLowerCase', '<', value.toLowerCase() + '\uf8ff'), limit(size) );
          } else {
            const lastVisibleDoc = query( collectionRef,  where('categoryNameLowerCase', '>=', value.toLowerCase()), where('categoryNameLowerCase', '<', value.toLowerCase() + '\uf8ff'), limit(page * size) );
            const lastVisibleDocSnapshot = await getDocs(lastVisibleDoc);
            const lastVisible = lastVisibleDocSnapshot.docs[lastVisibleDocSnapshot.docs.length-1];
            q = query( collectionRef,  where('categoryNameLowerCase', '>=', value.toLowerCase()), where('categoryNameLowerCase', '<', value.toLowerCase() + '\uf8ff'), startAfter(lastVisible), limit(size) );
          }
        }
      }
      if(field?.toLowerCase().includes('date')){
        const dateObject = new Date(value)
        if(preValue !== value){
          q = query( collectionRef, where("date", ">=", dateObject.getTime()));
          const querySnapshot = await getDocs(q);
          dispatch(onSetNumberCategories(querySnapshot.size));
        } if (page === 0) {
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

export const onStartChangeActiveCategory = () => {
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
