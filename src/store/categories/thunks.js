import { collection, doc, getDocs, orderBy, query, setDoc, where } from "firebase/firestore/lite";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { FirebaseDB, FirebaseStorage } from "../../firebase/config";
import { onChangeSavingNewCategory, onAddImage, onAddIcon, onAddSuccessMessage, onAddErrorMessage, 
    onCleanCategories, onChargeCategoriesUploaded, onAddCategoryAtStart, onSetCategories } from "./";


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
    const { activeCategory, categories } = getState().categories;

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
        dispatch(onSetCategories(categoriesArray));
        dispatch(onAddCategoryAtStart( {id: 1, ...activeCategory} ));
        dispatch(onAddSuccessMessage( 'Agregado correctamente' ));
        dispatch(onAddErrorMessage( '' ));
    }
    dispatch(onChangeSavingNewCategory(false));
  }
}

export const onStartGetCategories = () => {
  return async (dispatch) => {
    dispatch(onCleanCategories());

    const collectionRef = collection(FirebaseDB, `/categories`);
    const q = query( collectionRef, orderBy("date", "desc") );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc, index) => {
      dispatch(onChargeCategoriesUploaded( {id: index+1, ...doc.data()} ));
    });
    
  
  }
}

export const onStartFilterCategories = () => {
  return async (dispatch, getState) => {
    const { filter } = getState().categories;
    if(!!filter){
      const { field, value } = filter;
      dispatch(onCleanCategories());
      const collectionRef = collection(FirebaseDB, `/categories`);
      let q = null
      // TODO: Limitar las consultas por paginación
      if(field?.toLowerCase().includes('name')){
        if(value==='asc'){
          q = query( collectionRef, orderBy("categoryName", "asc") );
        }if(value==='desc'){
          q = query( collectionRef, orderBy("categoryName", "desc") );
        }if(value!=='asc' && value !== 'desc'){
          q = query( collectionRef, where('categoryName', '>=', value.toLowerCase()), where('categoryName', '<', value.toLowerCase() + '\uf8ff') );
        }
      }
      if(field?.toLowerCase().includes('date')){
        if(value!=='asc' && value !== 'desc'){
          const dateObject = new Date(value)
          q = query(collectionRef, where("date", ">", dateObject.getTime()));
        }
      }
  
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc, index) => {
        dispatch(onChargeCategoriesUploaded( {id: index+1, ...doc.data()} ));
      });
    }
  }
}


//TODO: onStartSaveCategory
//TODO: onStartDeletingCategory