import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth";
import { ordersSlice } from "./orders";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    orders: ordersSlice.reducer,
  },
});
