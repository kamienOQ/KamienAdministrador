import { collection, doc, getDocs, limit, orderBy, query, setDoc, startAfter, where } from "firebase/firestore/lite";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { FirebaseDB, FirebaseStorage } from "../../firebase/config";
import { onCleanCategories, onCleanAttributes, onChangeSavingNewProduct, onAddImageProduct, onAddIconProduct, 
  onAddSuccessMessage, onAddErrorMessage, onCleanProducts, onAddProductAtStart, onSetProducts, onSetAttributes, 
  onSetListAttributes, onSetNumberProducts, onAddProductNameLowerCase, onUpdateProduct, 
  onSetRelatedAttributes, onSetCategories, onSetRelatedCategories, onCleanListAttributes, 
  onSetRelatedListAttributes} from "./productsSlice";


export const onStartUploadFile = (file, type, collectionName) => {
  return async (dispatch) => {
    if ( file ){
      dispatch(onChangeSavingNewProduct(true));
      const id = Math.random().toString(36).substring(2) + Date.now().toString(36);
      let imgId = id + collectionName + file.name;
      const storageRef = ref(FirebaseStorage, imgId);

      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      if(type === 'image'){
        dispatch( onAddImageProduct( [imgId, downloadURL] ) );
      }else{
        dispatch( onAddIconProduct( [imgId, downloadURL] ) );
      }
      dispatch(onChangeSavingNewProduct(false));
    }
  }
}


export const onStartUploadNewProduct = () => {
  return async (dispatch, getState) => {

    let duplicateProduct = false;
    dispatch(onAddProductNameLowerCase());
    const { attributesSelected } = getState().ui;
    const { categoriesSelected } = getState().ui;
    const { listAttributesSelected } = getState().ui;
    dispatch(onSetRelatedAttributes( attributesSelected ));
    dispatch(onSetRelatedCategories( categoriesSelected ));
    dispatch(onSetRelatedListAttributes( listAttributesSelected ));
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
            dispatch(onStartNumberProducts());
          } else {
            const lastVisibleDoc = query( collectionRef,  orderBy("productNameLowerCase", "asc"), limit(page * size) );
            const lastVisibleDocSnapshot = await getDocs(lastVisibleDoc);
            const lastVisible = lastVisibleDocSnapshot.docs[lastVisibleDocSnapshot.docs.length-1];
            q = query( collectionRef,  orderBy("productNameLowerCase", "asc"), startAfter(lastVisible), limit(size) );
          }
        }if(value==='desc'){
          if (page === 0) {
            q = query( collectionRef, orderBy("productNameLowerCase", "desc"), limit(size) );
            dispatch(onStartNumberProducts());
          } else {
            const lastVisibleDoc = query( collectionRef,  orderBy("productNameLowerCase", "desc"), limit(page * size) );
            const lastVisibleDocSnapshot = await getDocs(lastVisibleDoc);
            const lastVisible = lastVisibleDocSnapshot.docs[lastVisibleDocSnapshot.docs.length-1];
            q = query( collectionRef,  orderBy("productNameLowerCase", "desc"), startAfter(lastVisible), limit(size) );
          }
        }if(value!=='asc' && value !== 'desc'){
          const formattedName = value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          if(preValue !== value){
            q = query( collectionRef, where('productNameLowerCase', '>=', formattedName), where('productNameLowerCase', '<', formattedName + '\uf8ff'));
            const querySnapshot = await getDocs(q);
            undersized = (querySnapshot.size <= size) ? true : false;
            dispatch(onSetNumberProducts(querySnapshot.size));
          } if (page === 0 || undersized) {
            q = query( collectionRef, where('productNameLowerCase', '>=', formattedName), where('productNameLowerCase', '<', formattedName + '\uf8ff'), limit(size) );
          } else {
            const lastVisibleDoc = query( collectionRef,  where('productNameLowerCase', '>=', formattedName), where('productNameLowerCase', '<', formattedName + '\uf8ff'), limit(page * size) );
            const lastVisibleDocSnapshot = await getDocs(lastVisibleDoc);
            const lastVisible = lastVisibleDocSnapshot.docs[lastVisibleDocSnapshot.docs.length-1];
            q = query( collectionRef,  where('productNameLowerCase', '>=', formattedName), where('productNameLowerCase', '<', formattedName + '\uf8ff'), startAfter(lastVisible), limit(size) );
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
    const { categoriesSelected } = getState().ui;
    const { attributesSelected } = getState().ui;
    const { listAttributesSelected } = getState().ui;
    dispatch(onAddProductNameLowerCase());
    dispatch(onChangeSavingNewProduct(true));
    dispatch(onSetRelatedCategories( categoriesSelected ));
    dispatch(onSetRelatedAttributes( attributesSelected ));
    dispatch(onSetRelatedListAttributes( listAttributesSelected ))
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

export const onStartGetAttributesForm = () => {
  return async (dispatch) => {
    dispatch(onCleanAttributes())
    const collectionRef = collection(FirebaseDB, `/attributes`);
    const q = query(collectionRef, where("attributeName", "!=", ""));
    const querySnapshot = await getDocs(q);

    const actualAttribute = querySnapshot.docs.map((doc) => {
      return doc.data().attributeName;
    });
    dispatch(onSetAttributes(actualAttribute));
  }
}

export const onStartGetListAttributesForm = () => {
  return async (dispatch, getState ) => {
    dispatch(onCleanListAttributes());
    const collectionRef = collection(FirebaseDB, `/attributes`);
    // ciclo para obtener cada atributo relacionado al nombre del atributo
    let { attributesSelected } = getState().ui;
    attributesSelected = attributesSelected.map( async (object) => {
      const q = query(collectionRef, where("attributeName", "==", object));
      const querySnapshot = await getDocs(q);
      
      const actualListAttribute = querySnapshot.docs.map((doc) => {
        //console.log(doc.data());
        const attributesFor = doc.data().attributesRelated.map( (attribute) => {
          // console.log(attribute);
          return attribute;
        })
        // console.log(attributesFor);
        return attributesFor;
      });
      console.log(actualListAttribute[0])
      dispatch(onSetListAttributes({ 'attributeSelected': object, 'feature': actualListAttribute[0] }));
    });
  }
}
