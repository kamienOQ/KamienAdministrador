import { collection, doc, getDocs, limit, orderBy, query, setDoc, startAfter, where } from "firebase/firestore/lite";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { FirebaseDB, FirebaseStorage } from "../../firebase/config";
import { onChangeSavingNewAttribute, onAddImage, onAddIcon, onAddSuccessMessage, onAddErrorMessage, 
    onCleanAttributes, onAddAttributeAtStart, onSetAttributes, onSetNumberAttributes, onUpdateAttribute,onAddAttributeNameLowerCase, onChangeActive, onSetCategoriesRelated, onSetAttributesRelated, onSetCategories, onCleanCategories} from ".";


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

export const onStartGetCategoriesForm = () => {
  return async (dispatch) => {
    dispatch(onCleanCategories())
    const collectionRef = collection(FirebaseDB, `/categories`);
    const q = query(collectionRef, where("categoryName", "!=", ""));
    const querySnapshot = await getDocs(q);

    const actualCategories = querySnapshot.docs.map((doc) => {
      return doc.data().categoryName;
    });
    dispatch(onSetCategories(actualCategories));
  }
}


export const onStartUploadNewAttribute = () => {
  return async (dispatch, getState) => {
    dispatch(onAddErrorMessage( '' ));
    dispatch(onAddSuccessMessage( '' ));
    const {categoriesSelected, attributesSelected} = getState().uiAtt;
    console.log(attributesSelected)
    dispatch(onSetCategoriesRelated(categoriesSelected));
    dispatch(onSetAttributesRelated(attributesSelected));
    let duplicateAttribute = false;
    dispatch(onAddAttributeNameLowerCase());
    const { activeAttribute, attributes, pageSize, page } = getState().attributes;

    console.log(activeAttribute)
    dispatch(onChangeSavingNewAttribute(true));

    const collectionRef = collection(FirebaseDB, `/attributes`);
    const q = query( collectionRef );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const { attributeName } = doc.data();
      //console.log(activeAttribute.attributeName.toLowerCase());
      if( attributeName.toLowerCase() === activeAttribute.attributeName.toLowerCase() ){
        duplicateAttribute = true;
        dispatch(onAddErrorMessage( 'Ya existe un Atributo con este nombre' ));
        dispatch(onAddSuccessMessage( '' ));
      }
    });
    if(!duplicateAttribute){
        const newDoc = doc(collectionRef);
        const setDocResp = await setDoc(newDoc, activeAttribute);
        if(page === 0){
          let attributesArray = [...attributes];
          attributesArray = attributesArray.map((object) => {
            return { ...object, id: object.id + 1 }
          });
          if(attributes.length < pageSize){
            dispatch(onSetAttributes(attributesArray));
          }if(attributes.length === pageSize){
            attributesArray.pop();
            dispatch(onSetAttributes(attributesArray));
          }
          dispatch(onAddAttributeAtStart( {id: 1, ...activeAttribute} ));
        }
        
        dispatch(onAddSuccessMessage( 'Agregado correctamente' ));
        dispatch(onAddErrorMessage( '' ));
    }
    dispatch(onChangeSavingNewAttribute(false));
  }
}


export const onStartGetAttributes = (page = 0, size = 5) => {
  return async (dispatch) => {
    dispatch(onCleanAttributes());

    const collectionRef = collection(FirebaseDB, `/attributes`);
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

    const newAttribute = querySnapshot.docs.map((doc, index) => {
      return { id: index + 1 + page * size, ...doc.data() };
    });
    dispatch(onSetAttributes(newAttribute));
    
  }
}

export const onStartGetAbout = (page = 0, size = 5) => {
  return async (dispatch) => {
    dispatch(onCleanAttributes());

    const collectionRef = collection(FirebaseDB, `/about`);
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

    const newAttribute = querySnapshot.docs.map((doc, index) => {
      return { id: index + 1 + page * size, ...doc.data() };
    });
    dispatch(onSetAttributes(newAttribute));
    
  }
}


export const onStartFiltersAttributes = (page = 0, size = 5, preValue) => {
  return async (dispatch, getState) => {

    const { filter } = getState().attributes;
    if(!!filter){
      const { field, value } = filter;
      dispatch(onCleanAttributes());
      const collectionRef = collection(FirebaseDB, `/attributes`);
      let q, undersized = false;
      if(field?.toLowerCase().includes('name')){
        if(value==='asc'){
          if (page === 0) {
            q = query( collectionRef, orderBy("attributeNameLowerCase", "asc"), limit(size) );
            dispatch(onStartNumberAttributes());
          } else {
            const lastVisibleDoc = query( collectionRef,  orderBy("attributeNameLowerCase", "asc"), limit(page * size) );
            const lastVisibleDocSnapshot = await getDocs(lastVisibleDoc);
            const lastVisible = lastVisibleDocSnapshot.docs[lastVisibleDocSnapshot.docs.length-1];
            q = query( collectionRef,  orderBy("attributeNameLowerCase", "asc"), startAfter(lastVisible), limit(size) );
          }
        }if(value==='desc'){
          if (page === 0) {
            q = query( collectionRef, orderBy("attributeNameLowerCase", "desc"), limit(size) );
            dispatch(onStartNumberAttributes());
          } else {
            const lastVisibleDoc = query( collectionRef,  orderBy("attributeNameLowerCase", "desc"), limit(page * size) );
            const lastVisibleDocSnapshot = await getDocs(lastVisibleDoc);
            const lastVisible = lastVisibleDocSnapshot.docs[lastVisibleDocSnapshot.docs.length-1];
            q = query( collectionRef,  orderBy("attributeNameLowerCase", "desc"), startAfter(lastVisible), limit(size) );
          }
        }if(value!=='asc' && value !== 'desc'){
          const formattedName = value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          if(preValue !== value){
            q = query( collectionRef, where('attributeNameLowerCase', '>=', formattedName), where('attributeNameLowerCase', '<', formattedName + '\uf8ff'));
            const querySnapshot = await getDocs(q);
            undersized = (querySnapshot.size <= size) ? true : false;
            dispatch(onSetNumberAttributes(querySnapshot.size));
          } if (page === 0 || undersized) {
            q = query( collectionRef, where('attributeNameLowerCase', '>=', formattedName), where('attributeNameLowerCase', '<', formattedName + '\uf8ff'), limit(size) );
          } else {
            const lastVisibleDoc = query( collectionRef,  where('attributeNameLowerCase', '>=', formattedName), where('attributeNameLowerCase', '<', formattedName + '\uf8ff'), limit(page * size) );
            const lastVisibleDocSnapshot = await getDocs(lastVisibleDoc);
            const lastVisible = lastVisibleDocSnapshot.docs[lastVisibleDocSnapshot.docs.length-1];
            q = query( collectionRef,  where('attributeNameLowerCase', '>=', formattedName), where('attributeNameLowerCase', '<', formattedName + '\uf8ff'), startAfter(lastVisible), limit(size) );
          }
        }
      }
      if(field?.toLowerCase().includes('date')){
        const dateObject = new Date(value)
        if(preValue !== value){
          q = query( collectionRef, where("date", ">=", dateObject.getTime()));
          const querySnapshot = await getDocs(q);
          undersized = (querySnapshot.size <= size) ? true : false;
          dispatch(onSetNumberAttributes(querySnapshot.size));
        } if (page === 0 || undersized) {
          q = query( collectionRef, where("date", ">=", dateObject.getTime()), limit(size) );
        } else {
          const lastVisibleDoc = query( collectionRef,  where("date", ">=", dateObject.getTime()), limit(page * size) );
          const lastVisibleDocSnapshot = await getDocs(lastVisibleDoc);
          const lastVisible = lastVisibleDocSnapshot.docs[lastVisibleDocSnapshot.docs.length-1];
          q = query( collectionRef,  where("date", ">=", dateObject.getTime()), startAfter(lastVisible), limit(size) );
        }
      }

      if(field?.toLowerCase().includes('actions')){
        if(value==='asc'){
          if(preValue !== value){
            q = query( collectionRef, where("active", "==", true), limit(size) );
            const querySnapshot = await getDocs(q);
            undersized = (querySnapshot.size <= size) ? true : false;
            dispatch(onSetNumberAttributes(querySnapshot.size));
          } if (page === 0 || undersized) {
            q = query( collectionRef, where("active", "==", true), limit(size) );
          } else {
            const lastVisibleDoc = query( collectionRef,  where("active", "==", true), limit(page * size) );
            const lastVisibleDocSnapshot = await getDocs(lastVisibleDoc);
            const lastVisible = lastVisibleDocSnapshot.docs[lastVisibleDocSnapshot.docs.length-1];
            q = query( collectionRef,  where("active", "==", true), startAfter(lastVisible), limit(size) );
          }
        }if(value==='desc'){
          if(preValue !== value){
            q = query( collectionRef, where("active", "==", false), limit(size) );
            const querySnapshot = await getDocs(q);
            undersized = (querySnapshot.size <= size) ? true : false;
            dispatch(onSetNumberAttributes(querySnapshot.size));
          } if (page === 0 || undersized) {
            q = query( collectionRef, where("active", "==", false), limit(size) );
          } else {
            const lastVisibleDoc = query( collectionRef,  where("active", "==", false), limit(page * size) );
            const lastVisibleDocSnapshot = await getDocs(lastVisibleDoc);
            const lastVisible = lastVisibleDocSnapshot.docs[lastVisibleDocSnapshot.docs.length-1];
            q = query( collectionRef,  where("active", "==", false), startAfter(lastVisible), limit(size) );
          }
        }

      }

      const querySnapshot = await getDocs(q);
      const newAttribute = querySnapshot.docs.map((doc, index) => {
        return { id: index + 1 + page * size, ...doc.data() };
      });
      dispatch(onSetAttributes(newAttribute));
    }
  }
}

export const onStartNumberAttributes = () => {
  return async (dispatch) => {
    const collectionRef = collection(FirebaseDB, `/attributes`);
    const querySnapshot = await getDocs(collectionRef);

    const numCategories = querySnapshot.size;
    dispatch(onSetNumberAttributes(numCategories));
  }
}

export const onStartUpdateAttribute = () => {
  return async( dispatch, getState ) => {
    dispatch(onAddErrorMessage( '' ));
    dispatch(onAddSuccessMessage( '' ));
    const {categoriesSelected, attributesSelected} = getState().uiAtt;
    dispatch(onSetCategoriesRelated(categoriesSelected));
    dispatch(onSetAttributesRelated(attributesSelected));

      let duplicateAttribute = false;
      dispatch(onChangeSavingNewAttribute(true));
      const { activeAttribute, preCategory } = getState().attributes;

    let q;  
    const collectionRef = collection(FirebaseDB, `/attributes`);
    q = query( collectionRef );
    const querySnapshot = await getDocs(q);

    if(preCategory.updatedName && activeAttribute.attributeName !== preCategory.name){
      querySnapshot.forEach((doc) => {
        const { attributeName } = doc.data();
        if( attributeName.toLowerCase() === activeAttribute.attributeName.toLowerCase() ){
          duplicateAttribute = true;
          dispatch(onAddErrorMessage( 'Ya existe un atributo con este nombre' ));
          dispatch(onAddSuccessMessage( '' ));
        }
      });
    }

    if(!duplicateAttribute){
      q = query(collectionRef, where('attributeName', '==', preCategory.name));
      const querySnapshot = await getDocs(q);
      let docRef;

      const attributeToFireStore = { ...activeAttribute };
      delete attributeToFireStore.id;

      if (querySnapshot.size === 1) {
        docRef = querySnapshot.docs[0].ref;
      }
  
      await setDoc( docRef, attributeToFireStore, { merge: true } )
      dispatch( onUpdateAttribute( activeAttribute ) );
      dispatch(onAddSuccessMessage( 'Editado correctamente' ));
      dispatch(onAddErrorMessage( '' ));
    }
      
  }
}

export const onStartChangeActiveAttribute = () => {
  return async( dispatch, getState ) => {

    dispatch(onChangeSavingNewAttribute(true));
    const { activeAttribute } = getState().attributes;

    let q;  
    const collectionRef = collection(FirebaseDB, `/attributes`);

    q = query(collectionRef, where('attributeName', '==', activeAttribute.attributeName));
    const querySnapshot = await getDocs(q);
    let docRef;

    const attributeToFireStore = { ...activeAttribute };
    delete attributeToFireStore.id;

    if (querySnapshot.size === 1) {
      docRef = querySnapshot.docs[0].ref;
    }

    await setDoc( docRef, attributeToFireStore, { merge: true } );
    dispatch(onChangeSavingNewAttribute(false));   
  }
}
