import { collection, doc, getDocs, query, setDoc } from "firebase/firestore/lite";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { FirebaseDB, FirebaseStorage } from "../../firebase/config";
import { onSetTotalPages } from "../";
import { onChangeSavingNewProduct, onAddImage, onAddIcon, onAddSuccessMessage, onAddErrorMessage, 
    onChargeProductsUploaded, onCleanProducts, onSetNumberProducts, onChargeProductUploaded, onAddLowerCase } from "./";



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
    dispatch(onAddLowerCase());

    const { activeProduct } = getState().products;
    let duplicateProduct = false;

    const collectionRef = collection(FirebaseDB, `/products`);
    const q = query( collectionRef );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const { productName } = doc.data();
      if( productName.toLowerCase() === activeProduct.productName.toLowerCase() ){
        duplicateProduct = true;
        dispatch(onAddErrorMessage( 'Ya existe un producto con este nombre' ));
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

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        dispatch(onChargeProductsUploaded( doc ));
    });
  }
}

export const onStartGetProducts = (page = 1) => {
  return async (dispatch) => {
    let number = page * 5;
    let counter = 0;
    let getProduct = false
    dispatch(onCleanProducts());
    
    const collectionRef = collection(FirebaseDB, `/products`);
    const q = query( collectionRef, orderBy("date", "desc"), );
    const querySnapshot = await getDocs(q);

    dispatch(onSetNumberProducts(querySnapshot._docs.length));
    if(querySnapshot._docs.length % 5 > 0){
      dispatch(onSetTotalPages(Math.floor(querySnapshot._docs.length/5) + 1));
    }else{
      dispatch(onSetTotalPages(Math.floor(querySnapshot._docs.length/5)));
    }

    querySnapshot.forEach((doc) => {
      if((number - 5 === counter && !getProduct) || (number === counter)){
        getProduct = !getProduct;
      }
      if(getProduct){
        dispatch(onChargeProductUploaded( doc.data() ));
      }
      counter++;
    });

  }
}

export const onStartGetProductsByName = (name, page = 1) => {
  return async (dispatch) => {
    let number = page * 5;
    let counter = 0;
    let getProduct = false;
    dispatch(onCleanProducts());

    const collectionRef = collection(FirebaseDB, `/products`);
    const q = query( collectionRef, where('productsNameLowerCase', '>=', name), where('productNameLowerCase', '<', name + '\uf8ff') );
    const querySnapshot = await getDocs(q);
    dispatch(onSetNumberProducts(querySnapshot._docs.length));
    if(querySnapshot._docs.length % 5 > 0){
      dispatch(onSetTotalPages(Math.floor(querySnapshot._docs.length/5) + 1));
    }else{
      dispatch(onSetTotalPages(Math.floor(querySnapshot._docs.length/5)));
    }

    querySnapshot.forEach((doc) => {
      if((number - 5 === counter && !getProduct) || (number === counter)){
        getProduct = !getProduct;
      }
      if(getProduct){
        dispatch(onChargeProductUploaded( doc.data() ));
      }
      counter++;
    });
  }
}

//TODO: onStartGetProductsByName
//TODO: onStartGetProductsByDate
//TODO: onStartSaveProduct
//TODO: onStartDeletingProduct