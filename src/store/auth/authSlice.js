import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "checking", // 'checking', 'not-authenticated', 'authenticated'
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
    success: null,
  },
  reducers: {
    login: (state, { payload }) => {
      state.status = "authenticated", // 'checking', 'not-authenticated', 'authenticated'
      state.uid = payload.uid;
      state.email = payload.email;
      state.displayName = payload.displayName;
      state.photoURL = payload.photoURL;
      state.errorMessage = null;
      state.success = null;
    },
    signUp: (state, { payload }) => {
      state.status = "authenticated", // 'checking', 'not-authenticated', 'authenticated'
      state.uid = payload.uid;
      state.email = payload.email;
      state.displayName = payload.displayName;
      state.photoURL = payload.photoURL;
      state.errorMessage = null;
      state.success = null;
    },
    logout: (state, { payload }) => {
      state.status = "not-authenticated", // 'checking', 'not-authenticated', 'authenticated'
      state.uid = null;
      state.email = null;
      state.displayName = null;
      state.photoURL = null;
      state.errorMessage = payload?.errorMessage;
    },
    checkingCredentials: (state) => {
      state.status = "checking";
    },
    actionSuccess: (state, { payload }) => {
      state.status = "not-authenticated";
      state.success = payload?.success;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, signUp, logout, checkingCredentials, actionSuccess } = authSlice.actions;
