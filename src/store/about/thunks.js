import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import { onAddLogo, onChangeSavingAbout, onSetData } from "./aboutSlice";
import { FirebaseStorage, FirebaseDB } from "../../firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";


export const onStartUploadFile = (file, collectionName) => {
    return async (dispatch) => {
      if ( file ){
        dispatch(onChangeSavingAbout(true));
        const id = Math.random().toString(36).substring(2) + Date.now().toString(36);
        let imgId = id+collectionName+file.name;
        const storageRef = ref(FirebaseStorage, imgId);
  
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        dispatch( onAddLogo( downloadURL ) );
        dispatch(onChangeSavingAbout(false));
      }
    }
  }

export const onStartGetAbout = () => {
    return async (dispatch) => {
        const collectionRef = collection(FirebaseDB, `/about`);  
        let q = query( collectionRef);
        const querySnapshot = await getDocs(q);

        const newAttribute = querySnapshot.docs.map((doc) => {
            return doc.data();
        });
        dispatch(onSetData(newAttribute));
      
    }
  }

export const onStartUpdateAbout = () => {
    return async ( dispatch, getState ) => {
        const { description, instagram, name, whatsapp, logo } = getState().about;
        const aboutData = {
            'description':  description || '',
            'instagram': instagram || '',
            'name': name || '',
            'whatsapp': whatsapp || '',
            'logo': logo || ''
        }
        const aboutDataToFireStore = { ...aboutData };

        const collectionRef = collection(FirebaseDB, 'about'); 
        const querySnapshot = await getDocs(collectionRef);

        if (querySnapshot.empty) {
            const newDoc = doc(collectionRef);
            const setDocResp = await setDoc(newDoc, aboutDataToFireStore);
        } else {
            let docRef;
            docRef = querySnapshot.docs[0].ref;
            await setDoc(docRef, aboutDataToFireStore, { merge: true });
        }
        // dispatch(onSetData([aboutData]));
    }
}