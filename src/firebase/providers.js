import { async } from "@firebase/util";
import { confirmPasswordReset, sendPasswordResetEmail, signInWithEmailAndPassword, updateEmail,updatePassword } from "firebase/auth";
import { collection, doc, getDoc,getDocs,updateDoc } from 'firebase/firestore'
import { FirebaseAuth } from "./config";
import { FirebaseDB } from "./config";
import { FirebaseApp } from "./config";
import { getFirestore } from "firebase/firestore";
const db = getFirestore(FirebaseApp)
export const loginWithEmailPassword = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    const { displayName, photoURL, uid } = result.user;

    return {
      ok: true,
      user: {
        uid,
        displayName,
        email,
        photoURL,
      },
    };
  } catch (error) {
    console.log(error);
    const errorCode = error.code;
    let errorMessage = error.message;

    if (errorCode === "auth/wrong-password" || errorCode === "auth/user-not-found") {
      errorMessage = "Credenciales incorrectas. Por favor, verifica tu correo y contraseña e intenta de nuevo.";
    } else if (errorCode === "auth/invalid-email") {
      errorMessage = "El correo es inválido.";
    }

    return {
      ok: false,
      errorMessage,
    };
  }
};

export const resetPasswordEmail = async (email) => {
  try {
    await sendPasswordResetEmail( FirebaseAuth, email );

    return {
      ok: true,
      success: true
    };
  } catch (error) {
    console.log(error);
    const errorCode = error.code;
    let errorMessage = error.message;

    if (errorCode === "auth/user-not-found") {
      errorMessage = "Por favor, verifica tu correo e intenta de nuevo.";
    } else if (errorCode === "auth/invalid-email") {
      errorMessage = "El correo es inválido.";
    }

    return {
      ok: false,
      errorMessage,
    };
  }
}

export const resetPassword = async (oobCode, password) => {
  try {
    await confirmPasswordReset( FirebaseAuth, oobCode, password );

    return {
      ok: true,
      success: true
    };
  } catch (error) {
    console.log(error);
    const errorCode = error.code;
    let errorMessage = error.message;

    if (errorCode === "auth/invalid-action-code") {
      errorMessage = "El enlace de restablecimiento de contraseña que se ha proporcionado es inválido, expirado o ya se ha utilizado.";
    }

    return {
      ok: false,
      errorMessage,
    };
  }
}

export const getUserInfo = async() =>{
  try{
    const usersRef = doc(db, "users" , FirebaseAuth.currentUser.uid)
    const docSnap = await getDoc(usersRef)
    return docSnap.data()
  }catch(error){
    console.log("Error a la hora de obtener información del usuario : " ,error)
  }
}
export const updateLoggedUser = async(newData) =>{
  try{
    const usersRef = doc(db, "users" , FirebaseAuth.currentUser.uid)
    await updateDoc(usersRef,newData)
  }catch(error){
    console.log("Error a la hora de Editar el usuario : " ,error)
  }
}
export const updateUserEmail = async(email) => {
  try {
    await updateEmail(FirebaseAuth.currentUser,email);
    console.log("Email changed successfully!");
  } catch (error) {
    console.error(error);
  }
}

export const updateUserPassword = async(password) => {
  try {
    await updatePassword(FirebaseAuth.currentUser,password);
    console.log("Email changed successfully!");
  } catch (error) {
    console.error(error);
  }
  }

export const logoutFirebase = async () => {
  return await FirebaseAuth.signOut();
}


export const getCurrentUser = async() => {
  try{
    const currentUserId = FirebaseAuth.currentUser.uid;
    const userRef = doc(FirebaseDB, "users", currentUserId);
    const userSnapshot = await getDoc(userRef)
    const userData = userSnapshot.data()
    return userData
  }catch(error){
    console.log(error)
    return 0
  }
}
export const getAllUsers = async() =>{
  const users = await getDocs(collection(db, "users"))
  return users.docs.filter(doc => doc.data().habilitado === true).map(doc =>({id: doc.id, ...doc.data()}))
};

export const updateUser = async(uid,newData) => {
  try{
    const usersRef = doc(db, "users" , uid)
    await updateDoc(usersRef,newData)
  }catch(error){
    console.log("Error a la hora de actualizar el usuario : " ,error)
  }
};

export const eliminateUser = async(uid,newData) => {
  try{
    const usersRef = doc(db, "users" , uid)
    await updateDoc(usersRef,newData)
  }catch(error){
    console.log("Error a la hora de eliminar el usuario : " ,error)
  }
};

