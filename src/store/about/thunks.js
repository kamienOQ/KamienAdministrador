import { collection, doc, getDocs, getFirestore, query, setDoc } from "firebase/firestore";
// import { FirebaseDB } from "../../firebase/config";
import { onSetData } from "./aboutSlice";
import { initializeApp } from "firebase/app";


const firebaseConfig = {
    apiKey: "AIzaSyBHz7C_ZqXuy7ruUOOdPgwcuxVWTa9wjBc",
    authDomain: "respaldo-project-kamien.firebaseapp.com",
    projectId: "respaldo-project-kamien",
    storageBucket: "respaldo-project-kamien.appspot.com",
    messagingSenderId: "86678841516",
    appId: "1:86678841516:web:2fca0057eea81c6671d709"
};

const FirebaseApp = initializeApp(firebaseConfig);
const FirebaseDB = getFirestore(FirebaseApp);

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
        const { description, instagram, name, whatsapp } = getState().about;
        const aboutData = {
            'description':  description || '',
            'instagram': instagram || '',
            'name': name || '',
            'whatsapp': whatsapp || ''
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