import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth";
import { uiSlice } from "./ui/uiSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
  },
});
