import { configureStore } from '@reduxjs/toolkit'
import { attributesSlice, uiSlice } from './'
import { authSlice } from "./auth";
import { ordersSlice } from "./orders";

export const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        attributes: attributesSlice.reducer,
        auth: authSlice.reducer,
        orders: ordersSlice.reducer,
    }
});