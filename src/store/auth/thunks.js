import {
  loginWithEmailPassword,
  logoutFirebase,
  resetPassword,
  resetPasswordEmail,
} from "../../firebase/providers";
import { checkingCredentials, logout, login, actionSuccess } from "./";

export const checkingAuthentication = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

export const startLoginWithEmailPassword = ( email, password ) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const result = await loginWithEmailPassword( email, password );

    if (!result.ok) return dispatch(logout(result));
    
    dispatch(login(result.user));
  };
};

export const startForgotPassword = ( email ) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const result = await resetPasswordEmail( email );

    if (!result.ok) return dispatch(logout(result));

    dispatch(actionSuccess(result));
  };
};

export const startResetPassword = ( oobCode, password ) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const result = await resetPassword( oobCode, password );

    if (!result.ok) return dispatch(logout(result));

    dispatch(actionSuccess(result));
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    await logoutFirebase();

    dispatch(logout());
  };
};
