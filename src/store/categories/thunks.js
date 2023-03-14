import { collection, doc, getDocs, query, setDoc } from "firebase/firestore/lite";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { FirebaseDB, FirebaseStorage } from "../../firebase/config";
import { onChangeSavingNewCategory, onAddImage, onAddIcon, onAddSuccessMessage, onAddErrorMessage, onChargeProductsUploaded, onCleanCategories, onSetNumberCategories, onChargeCategoriesUploaded } from "./categoriesSlice";


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

export const onStarCountCategories = () => {
  return async (dispatch) => {
    const collectionRef = collection(FirebaseDB, `/categories`);
    const q = query( collectionRef );
    const querySnapshot = await getDocs(q);
    dispatch(onSetNumberCategories(querySnapshot._docs.length))
  }
}

export const onStartGetCategories = (page = 1) => {
  return async (dispatch, getState) => {
    let number = page * 5;
    let counter = 0;
    let getCategory = false
    if(getState().categories !== [] ){
      dispatch(onCleanCategories());
    }
    const collectionRef = collection(FirebaseDB, `/categories`);
    const q = query( collectionRef );

    const querySnapshot = await getDocs(q);
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

//TODO: onStartGetCategoriesByName
//TODO: onStartGetCategoriesByDate
//TODO: onStartSaveCategory
//TODO: onStartDeletingCategory