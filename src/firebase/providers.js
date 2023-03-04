import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseAuth } from "./config";

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
    console.log(error)
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

export const logoutFirebase = async () => {
  return await FirebaseAuth.signOut();
}
