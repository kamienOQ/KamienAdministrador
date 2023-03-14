import { collection, doc, getDocs, query, setDoc } from "firebase/firestore/lite";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { FirebaseDB, FirebaseStorage } from "../../firebase/config";
import { onChangeSavingNewCategory, onAddImage1, onAddIcon1, onAddSuccessMessage1, onAddErrorMessage1, onChargeProductsUploaded } from "./categoriesSlice";


export const onStartUploadFile1 = (file, type, collectionName) => {
  return async (dispatch) => {
    if ( file ){
      let imgId = collectionName+file.name;
      const storageRef = ref(FirebaseStorage, imgId);

      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      if(type === 'image'){
        dispatch( onAddImage1( [imgId, downloadURL] ) );
      }else{
        dispatch( onAddIcon1( [imgId, downloadURL] ) );
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
        dispatch(onAddErrorMessage1( 'Ya existe una categoría con este nombre' ));
        dispatch(onAddSuccessMessage1( '' ));
      }
    });
    if(!duplicateCategory){
        const newDoc = doc(collectionRef);
        const setDocResp = await setDoc(newDoc, activeCategory);
        dispatch(onAddSuccessMessage1( 'Agregado correctamente' ));
        dispatch(onAddErrorMessage( '' ));
    }
    dispatch(onChangeSavingNewCategory(false));
  }
}

export const onStarGetProductsUploaded1 = () => {
  return async (dispatch) => {

    const collectionRef = collection(FirebaseDB, `/products`);
    const q = query( collectionRef );
    querySnapshot.forEach((doc) => {
        dispatch(onChargeProductsUploaded( doc ));
    });
  }
}

//TODO: onStartLoadingCategories
//TODO: onStartSaveCategory
//TODO: onStartDeletingCategory