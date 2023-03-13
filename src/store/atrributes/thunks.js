import { collection, doc, getDocs, query, setDoc } from "firebase/firestore/lite";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { FirebaseDB, FirebaseStorage } from "../../firebase/config";
import { onChangeSavingNewAttribute, onAddSuccessMessage, onAddErrorMessage, onChargeCategoriesUploaded } from "./attributesSlice";


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


export const onStartUploadNewAttribute = () => {
  return async (dispatch, getState) => {

    dispatch(onChangeSavingNewAttribute(true));

    const { activeAttribute } = getState().attributes;
    let duplicateAttribute = false;

    const collectionRef = collection(FirebaseDB, `/attributes`);
    const q = query( collectionRef );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const { attributeName } = doc.data();
      if( attributeName.toLowerCase() === activeAttribute.attributeName.toLowerCase() ){
        duplicateAttribute = true;
        dispatch(onAddErrorMessage( 'Ya existe una categoría con este nombre' ));
        dispatch(onAddSuccessMessage( '' ));
      }
    });
    if(!duplicateAttribute){
        const newDoc = doc(collectionRef);
        const setDocResp = await setDoc(newDoc, activeAttribute);
        dispatch(onAddSuccessMessage( 'Agregado correctamente' ));
        dispatch(onAddErrorMessage( '' ));
    }
    dispatch(onChangeSavingNewAttribute(false));
  }
}

export const onStarGetCategoriesUploaded = () => {
  return async (dispatch) => {

    const collectionRef = collection(FirebaseDB, `/categories`);
    const q = query( collectionRef );
    querySnapshot.forEach((doc) => {
        dispatch(onChargeCategoriesUploaded( doc ));
    });
  }
}

//TODO: onStartLoadingAttributes
//TODO: onStartSaveAttribute
//TODO: onStartDeletingAttribute