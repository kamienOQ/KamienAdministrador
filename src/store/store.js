import { configureStore } from '@reduxjs/toolkit'
import { categoriesSlice, uiSlice } from './'
import { authSlice } from "./auth";
import { ordersSlice } from "./orders";

export const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        categories: categoriesSlice.reducer,
        auth: authSlice.reducer,
        orders: ordersSlice.reducer,
    }
});