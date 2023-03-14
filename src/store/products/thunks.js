import { collection, doc, getDocs, query, setDoc } from "firebase/firestore/lite";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { FirebaseDB, FirebaseStorage } from "../../firebase/config";
import { onChangeSavingNewProduct, onAddImage, onAddIcon, onAddSuccessMessage, onAddErrorMessage, onChargeProductsUploaded } from "./productsSlice";


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


export const onStartUploadNewProduct = () => {
  return async (dispatch, getState) => {

    dispatch(onChangeSavingNewProduct(true));

    const { activeProduct } = getState().products;
    let duplicateProduct = false;

    const collectionRef = collection(FirebaseDB, `/products`);
    const q = query( collectionRef );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const { productName } = doc.data();
      if( productName.toLowerCase() === activeProduct.productName.toLowerCase() ){
        duplicateProduct = true;
        dispatch(onAddErrorMessage( 'Ya existe una producto con este nombre' ));
        dispatch(onAddSuccessMessage( '' ));
      }
    });
    if(!duplicateProduct){
        const newDoc = doc(collectionRef);
        const setDocResp = await setDoc(newDoc, activeProduct);
        dispatch(onAddSuccessMessage( 'Agregado correctamente' ));
        dispatch(onAddErrorMessage( '' ));
    }
    dispatch(onChangeSavingNewProduct(false));
  }
}

export const onStarGetProductsUploaded = () => {
  return async (dispatch) => {

    const collectionRef = collection(FirebaseDB, `/products`);
    const q = query( collectionRef );
    querySnapshot.forEach((doc) => {
        dispatch(onChargeProductsUploaded( doc ));
    });
  }
}

//TODO: onStartLoadingProducts
//TODO: onStartSaveProduct
//TODO: onStartDeletingProduct