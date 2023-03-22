import { collection, doc, getDocs, orderBy, query, setDoc, where } from "firebase/firestore/lite";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { FirebaseDB, FirebaseStorage } from "../../firebase/config";
import { onSetTotalPages } from "../";
import { onChangeSavingNewCategory, onAddImage1, onAddIcon1, onAddSuccessMessage1, onAddErrorMessage1, 
    onCleanCategories, onSetNumberCategories, onChargeCategoriesUploaded, onAddLowerCase1, onAddCategoryAtStart } from "./";


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
    
    let duplicateCategory = false;
    const { activeCategory } = getState().categories;

    dispatch(onChangeSavingNewCategory(true));
    dispatch(onAddLowerCase1());

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
        dispatch(onAddCategoryAtStart( activeCategory ));
        dispatch(onAddSuccessMessage1( 'Agregado correctamente' ));
        dispatch(onAddErrorMessage1( '' ));
    }
    dispatch(onChangeSavingNewCategory(false));
  }
}

export const onStartGetCategories = () => {
  return async (dispatch, getState) => {
    let repetido = false
    dispatch(onCleanCategories());

    const collectionRef = collection(FirebaseDB, `/categories`);
    const q = query( collectionRef, orderBy("date", "desc") );
    const querySnapshot = await getDocs(q);

    dispatch(onSetNumberCategories(querySnapshot._docs.length));
    if(querySnapshot._docs.length % 5 > 0){
      dispatch(onSetTotalPages(Math.floor(querySnapshot._docs.length/5) + 1));
    }else{
      dispatch(onSetTotalPages(Math.floor(querySnapshot._docs.length/5)));
    }

    querySnapshot.forEach((doc, index) => {
      dispatch(onChargeCategoriesUploaded( doc.data() ));
    });
    
  
  }
}

// export const onStartGetCategoriesByName = (name, page = 1) => {
//   return async (dispatch) => {
//     let number = page * 5;
//     let counter = 0;
//     let getCategory = false;
//     dispatch(onCleanCategories());
//     dispatch(onChangeAscending(''));

//     const collectionRef = collection(FirebaseDB, `/categories`);
//     const q = query( collectionRef, where('categoryNameLowerCase', '>=', name), where('categoryNameLowerCase', '<', name + '\uf8ff') );
//     const querySnapshot = await getDocs(q);
//     dispatch(onSetNumberCategories(querySnapshot._docs.length));
//     if(querySnapshot._docs.length % 5 > 0){
//       dispatch(onSetTotalPages(Math.floor(querySnapshot._docs.length/5) + 1));
//     }else{
//       dispatch(onSetTotalPages(Math.floor(querySnapshot._docs.length/5)));
//     }

//     querySnapshot.forEach((doc) => {
//       if((number - 5 === counter && !getCategory) || (number === counter)){
//         getCategory = !getCategory;
//       }
//       if(getCategory){
//         dispatch(onChargeCategoriesUploaded( doc.data() ));
//       }
//       counter++;
//     });
//   }
// }


//TODO: onStartGetCategoriesByDate
//TODO: onStartSaveCategory
//TODO: onStartDeletingCategory