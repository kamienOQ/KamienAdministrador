import { configureStore } from '@reduxjs/toolkit'
import { categoriesSlice, uiSlice } from './'
import { attributesSlice } from './'
import { authSlice } from "./auth";
import { ordersSlice } from "./orders";

export const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        categories: categoriesSlice.reducer,
        attributes: attributesSlice.reducer,
        auth: authSlice.reducer,
        orders: ordersSlice.reducer,
    }
});