import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth";
import { ordersSlice } from "./orders";
import { uiSlice } from "./ui/uiSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    orders: ordersSlice.reducer,
    ui: uiSlice.reducer,
  },
});
