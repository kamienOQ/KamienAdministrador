import { collection, doc, getDocs, limit, orderBy, query, setDoc, startAfter, where } from "firebase/firestore/lite";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { FirebaseDB, FirebaseStorage } from "../../firebase/config";
import { onChangeSavingNewProduct, onAddImageProduct, onAddIconProduct, onAddSuccessMessage, onAddErrorMessage, 
    onCleanProducts, onAddProductAtStart, onSetProducts, onSetNumberProducts, onAddProductNameLowerCase, onUpdateProduct, onChangeActive } from "./";


export const onStartUploadFile = (file, type, collectionName) => {
  return async (dispatch) => {
    if ( file ){
      let imgId = collectionName+file.name;
      const storageRef = ref(FirebaseStorage, imgId);

      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      if(type === 'image'){
        dispatch( onAddImageProduct( [imgId, downloadURL] ) );
      }else{
        dispatch( onAddIconProduct( [imgId, downloadURL] ) );
      }
    }
  }
}


export const onStartUploadNewProduct = () => {
  return async (dispatch, getState) => {

    let duplicateProduct = false;
    dispatch(onAddProductNameLowerCase());
    const { activeProduct, products, pageSize, page } = getState().products;

    dispatch(onChangeSavingNewProduct(true));

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
      if(page === 0){
        let productsArray = [...products];
        productsArray = productsArray.map((object) => {
          return { ...object, id: object.id + 1 }
        });
        if(products.length < pageSize){
          dispatch(onSetProducts(productsArray));
        }if(products.length === pageSize){
          productsArray.pop();
          dispatch(onSetProducts(productsArray));
        }
        dispatch(onAddProductAtStart( {id: 1, ...activeProduct} ));
      }
      
      dispatch(onAddSuccessMessage( 'Agregado correctamente' ));
      dispatch(onAddErrorMessage( '' ));
  }
  dispatch(onChangeSavingNewProduct(false));
  }
}

export const onStartGetProducts = (page = 0, size = 5) => {
  return async ( dispatch ) => {
    dispatch(onCleanProducts());

    const collectionRef = collection(FirebaseDB, `/products`);
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

    const newProducts = querySnapshot.docs.map((doc, index) => {
      return { id: index + 1 + page * size, ...doc.data() };
    });
    dispatch(onSetProducts(newProducts));
    
  }
}

export const onStartFilterProducts = (page = 0, size = 5, preValue) => {
  return async (dispatch, getState) => {

    const { filter } = getState().products;
    if(!!filter){
      const { field, value } = filter;
      dispatch(onCleanProducts());
      const collectionRef = collection(FirebaseDB, `/products`);
      let q, undersized = false;
      if(field?.toLowerCase().includes('name')){
        if(value==='asc'){
          if (page === 0) {
            q = query( collectionRef, orderBy("productNameLowerCase", "asc"), limit(size) );
          } else {
            const lastVisibleDoc = query( collectionRef,  orderBy("productNameLowerCase", "asc"), limit(page * size) );
            const lastVisibleDocSnapshot = await getDocs(lastVisibleDoc);
            const lastVisible = lastVisibleDocSnapshot.docs[lastVisibleDocSnapshot.docs.length-1];
            q = query( collectionRef,  orderBy("productNameLowerCase", "asc"), startAfter(lastVisible), limit(size) );
          }
        }if(value==='desc'){
          if (page === 0) {
            q = query( collectionRef, orderBy("productNameLowerCase", "desc"), limit(size) );
          } else {
            const lastVisibleDoc = query( collectionRef,  orderBy("productNameLowerCase", "desc"), limit(page * size) );
            const lastVisibleDocSnapshot = await getDocs(lastVisibleDoc);
            const lastVisible = lastVisibleDocSnapshot.docs[lastVisibleDocSnapshot.docs.length-1];
            q = query( collectionRef,  orderBy("productNameLowerCase", "desc"), startAfter(lastVisible), limit(size) );
          }
        }if(value!=='asc' && value !== 'desc'){
          if(preValue !== value){
            q = query( collectionRef, where('productNameLowerCase', '>=', value.toLowerCase()), where('productNameLowerCase', '<', value.toLowerCase() + '\uf8ff'));
            const querySnapshot = await getDocs(q);
            undersized = (querySnapshot.size <= size) ? true : false;
            dispatch(onSetNumberProducts(querySnapshot.size));
          } if (page === 0 || undersized) {
            q = query( collectionRef, where('productNameLowerCase', '>=', value.toLowerCase()), where('productNameLowerCase', '<', value.toLowerCase() + '\uf8ff'), limit(size) );
          } else {
            const lastVisibleDoc = query( collectionRef,  where('productNameLowerCase', '>=', value.toLowerCase()), where('productNameLowerCase', '<', value.toLowerCase() + '\uf8ff'), limit(page * size) );
            const lastVisibleDocSnapshot = await getDocs(lastVisibleDoc);
            const lastVisible = lastVisibleDocSnapshot.docs[lastVisibleDocSnapshot.docs.length-1];
            q = query( collectionRef,  where('productNameLowerCase', '>=', value.toLowerCase()), where('productNameLowerCase', '<', value.toLowerCase() + '\uf8ff'), startAfter(lastVisible), limit(size) );
          }
        }
      }
      if(field?.toLowerCase().includes('date')){
        const dateObject = new Date(value)
        if(preValue !== value){
          q = query( collectionRef, where("date", ">=", dateObject.getTime()));
          const querySnapshot = await getDocs(q);
          undersized = (querySnapshot.size <= size) ? true : false;
          dispatch(onSetNumberProducts(querySnapshot.size));
        } if (page === 0 || undersized) {
          q = query( collectionRef, where("date", ">=", dateObject.getTime()), limit(size) );
        } else {
          const lastVisibleDoc = query( collectionRef,  where("date", ">=", dateObject.getTime()), limit(page * size) );
          const lastVisibleDocSnapshot = await getDocs(lastVisibleDoc);
          const lastVisible = lastVisibleDocSnapshot.docs[lastVisibleDocSnapshot.docs.length-1];
          q = query( collectionRef,  where("date", ">=", dateObject.getTime()), startAfter(lastVisible), limit(size) );
        }
      }

      const querySnapshot = await getDocs(q);
      const newProducts = querySnapshot.docs.map((doc, index) => {
        return { id: index + 1 + page * size, ...doc.data() };
      });
  
      dispatch(onSetProducts(newProducts));
    }
  }
}

export const onStartNumberProducts = () => {
  return async (dispatch) => {
    const collectionRef = collection(FirebaseDB, `/products`);
    const querySnapshot = await getDocs(collectionRef);

    const numProducts = querySnapshot.size;
    dispatch(onSetNumberProducts(numProducts));
  }
}

export const onStartUpdateProduct = () => {
  return async( dispatch, getState ) => {

      let duplicateProduct = false;
      dispatch(onChangeSavingNewProduct(true));
      const { activeProduct, preProduct } = getState().products;

    let q;  
    const collectionRef = collection(FirebaseDB, `/products`);
    q = query( collectionRef );
    const querySnapshot = await getDocs(q);

    if(preProduct.updatedName && activeProduct.productName !== preProduct.name){
      querySnapshot.forEach((doc) => {
        const { productName } = doc.data();
        if( productName.toLowerCase() === activeProduct.productName.toLowerCase() ){
          duplicateProduct = true;
          dispatch(onAddErrorMessage( 'Ya existe un producto con este nombre' ));
          dispatch(onAddSuccessMessage( '' ));
        }
      });
    }

    if(!duplicateProduct){
      q = query(collectionRef, where('productName', '==', preProduct.name));
      const querySnapshot = await getDocs(q);
      let docRef;

      const productToFireStore = { ...activeProduct };
      delete productToFireStore.id;

      if (querySnapshot.size === 1) {
        docRef = querySnapshot.docs[0].ref;
      }
  
      await setDoc( docRef, productToFireStore, { merge: true } )
      dispatch( onUpdateProduct( activeProduct ) );
      dispatch(onAddSuccessMessage( 'Editado correctamente' ));
      dispatch(onAddErrorMessage( '' ));
    }
      
  }
}


export const onStartChangeActiveProduct = () => {
  return async( dispatch, getState ) => {

    dispatch(onChangeSavingNewProduct(true));
    const { activeProduct } = getState().products;

    let q;  
    const collectionRef = collection(FirebaseDB, `/products`);

    q = query(collectionRef, where('productName', '==', activeProduct.productName));
    const querySnapshot = await getDocs(q);
    let docRef;

    const productToFireStore = { ...activeProduct };
    delete productToFireStore.id;

    if (querySnapshot.size === 1) {
      docRef = querySnapshot.docs[0].ref;
    }

    await setDoc( docRef, productToFireStore, { merge: true } );
    dispatch(onChangeSavingNewProduct(false));   
  }
}