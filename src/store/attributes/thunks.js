import { collection, doc, getDocs, orderBy, query, setDoc, where } from "firebase/firestore/lite";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { FirebaseDB, FirebaseStorage } from "../../firebase/config";
import { onSetTotalPages } from "..";
import { onChangeSavingNewAttribute, onAddImage, onAddIcon, onAddSuccessMessage, onAddErrorMessage, 
    onCleanAttributes, onSetNumberAttributes, onChargeAttributesUploaded, onAddAttributeAtStart, onSetAttributes } from ".";


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


export const onstartUploadNewAttribute = () => {
  return async (dispatch, getState) => {
    
    let duplicateAttribute = false;
    const { activeAttribute, attributes } = getState().attributes;

    dispatch(onChangeSavingNewAttribute(true));

    const collectionRef = collection(FirebaseDB, `/attributes`);
    const q = query( collectionRef );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const { attributeName } = doc.data();
      if( attributeName.toLowerCase() === activeAttribute.attributeName.toLowerCase() ){
        duplicateAttribute = true;
        dispatch(onAddErrorMessage( 'Ya existe una atributo con este nombre' ));
        dispatch(onAddSuccessMessage( '' ));
      }
    });
    if(!duplicateAttribute){
        const newDoc = doc(collectionRef);
        const setDocResp = await setDoc(newDoc, activeAttribute);
        let attributesArray = [...attributes];
        attributesArray = attributesArray.map((object) => {
          return { ...object, id: object.id + 1 }
        });
        dispatch(onSetAttributes(attributesArray));
        dispatch(onAddAttributeAtStart( {id: 1, ...activeAttribute} ));
        dispatch(onAddSuccessMessage( 'Agregado correctamente' ));
        dispatch(onAddErrorMessage( '' ));
    }
    dispatch(onChangeSavingNewAttribute(false));
  }
}

export const onStartGetAttributes = () => {
  return async (dispatch) => {
    let repetido = false
    dispatch(onCleanAttributes());

    const collectionRef = collection(FirebaseDB, `/attributes`);
    const q = query( collectionRef, orderBy("date", "desc") );
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot._docs.length)

    dispatch(onSetNumberAttributes(querySnapshot._docs.length));
    if(querySnapshot._docs.length % 5 > 0){
      dispatch(onSetTotalPages(Math.floor(querySnapshot._docs.length/5) + 1));
    }else{
      dispatch(onSetTotalPages(Math.floor(querySnapshot._docs.length/5)));
    }

    querySnapshot.forEach((doc, index) => {
      dispatch(onChargeAttributesUploaded( {id: index+1, ...doc.data()} ));
    });
    
  
  }
}

// export const onStartGetAttributesByName = (name, page = 1) => {
//   return async (dispatch) => {
//     let number = page * 5;
//     let counter = 0;
//     let getAttribute = false;
//     dispatch(onCleanAttributes());
//     dispatch(onChangeAscending(''));

//     const collectionRef = collection(FirebaseDB, `/attributes`);
//     const q = query( collectionRef, where('attributeNameLowerCase', '>=', name), where('attributeNameLowerCase', '<', name + '\uf8ff') );
//     const querySnapshot = await getDocs(q);
//     dispatch(onSetNumberAttributes(querySnapshot._docs.length));
//     if(querySnapshot._docs.length % 5 > 0){
//       dispatch(onSetTotalPages(Math.floor(querySnapshot._docs.length/5) + 1));
//     }else{
//       dispatch(onSetTotalPages(Math.floor(querySnapshot._docs.length/5)));
//     }

//     querySnapshot.forEach((doc) => {
//       if((number - 5 === counter && !getAttribute) || (number === counter)){
//         getAttribute = !getAttribute;
//       }
//       if(getAttribute){
//         dispatch(onChargeAttributesUploaded( doc.data() ));
//       }
//       counter++;
//     });
//   }
// }


//TODO: onStartGetAttributesByDate
//TODO: onStartSaveAttribute
//TODO: onStartDeletingAttribute