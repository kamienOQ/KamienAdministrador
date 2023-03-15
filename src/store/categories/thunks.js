import { collection, doc, getDocs, orderBy, query, setDoc, where } from "firebase/firestore/lite";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { FirebaseDB, FirebaseStorage } from "../../firebase/config";
import { onSetTotalPages } from "../";
import { onChangeSavingNewCategory, onAddImage, onAddIcon, onAddSuccessMessage, onAddErrorMessage, 
    onChargeProductsUploaded, onCleanCategories, onSetNumberCategories, onChargeCategoriesUploaded, onAddLowerCase, onChangeAscending } from "./";


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

    dispatch(onChangeSavingNewCategory(true));
    dispatch(onAddLowerCase());

    const { activeCategory } = getState().categories;
    let duplicateCategory = false;

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
        dispatch(onAddSuccessMessage( 'Agregado correctamente' ));
        dispatch(onAddErrorMessage( '' ));
    }
    dispatch(onChangeSavingNewCategory(false));
  }
}

export const onStarGetProductsUploaded = () => {
  return async (dispatch) => {

    const collectionRef = collection(FirebaseDB, `/products`);
    const q = query( collectionRef );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        dispatch(onChargeProductsUploaded( doc ));
    });
  }
}

export const onStartGetCategories = (page = 1) => {
  return async (dispatch, getState) => {
   const { ascending } =  getState().categories;
    let number = page * 5;
    let counter = 0;
    let getCategory = false;
    dispatch(onCleanCategories());
    const collectionRef = collection(FirebaseDB, `/categories`);
    let q = null
    if(ascending===''){
      q = query( collectionRef, orderBy("date", "desc") );
    }
    if(ascending==='dateAscending'){
      q = query( collectionRef, orderBy("date", "asc") );
    }
    if(ascending==='ascending'){
      q = query( collectionRef, orderBy("categoryNameLowerCase", "asc") );
    }
    if(ascending==='descending'){
      q = query( collectionRef, orderBy("categoryNameLowerCase", "desc") );
    }
    const querySnapshot = await getDocs(q);

    dispatch(onSetNumberCategories(querySnapshot._docs.length));
    if(querySnapshot._docs.length % 5 > 0){
      dispatch(onSetTotalPages(Math.floor(querySnapshot._docs.length/5) + 1));
    }else{
      dispatch(onSetTotalPages(Math.floor(querySnapshot._docs.length/5)));
    }

    

    querySnapshot.forEach((doc) => {
      if((number - 5 === counter && !getCategory) || (number === counter)){
        getCategory = !getCategory;
      }
      if(getCategory){
        dispatch(onChargeCategoriesUploaded( doc.data() ));
      }
      counter++;
    });

  }
}

export const onStartGetCategoriesByName = (name, page = 1) => {
  return async (dispatch) => {
    let number = page * 5;
    let counter = 0;
    let getCategory = false;
    dispatch(onCleanCategories());
    dispatch(onChangeAscending(''));

    const collectionRef = collection(FirebaseDB, `/categories`);
    const q = query( collectionRef, where('categoryNameLowerCase', '>=', name), where('categoryNameLowerCase', '<', name + '\uf8ff') );
    const querySnapshot = await getDocs(q);
    dispatch(onSetNumberCategories(querySnapshot._docs.length));
    if(querySnapshot._docs.length % 5 > 0){
      dispatch(onSetTotalPages(Math.floor(querySnapshot._docs.length/5) + 1));
    }else{
      dispatch(onSetTotalPages(Math.floor(querySnapshot._docs.length/5)));
    }

    querySnapshot.forEach((doc) => {
      if((number - 5 === counter && !getCategory) || (number === counter)){
        getCategory = !getCategory;
      }
      if(getCategory){
        dispatch(onChargeCategoriesUploaded( doc.data() ));
      }
      counter++;
    });
  }
}


//TODO: onStartGetCategoriesByDate
//TODO: onStartSaveCategory
//TODO: onStartDeletingCategory