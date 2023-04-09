import { confirmPasswordReset, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
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

export const signUpWithNameEmailPassword = async (nameUser, email, password) => {
  try {
    const result = await signInWithEmailAndPassword(
      FirebaseAuth,
      nameUser,
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


export const logoutFirebase = async () => {
  return await FirebaseAuth.signOut();
}
