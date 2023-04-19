import { configureStore } from '@reduxjs/toolkit'
import { attibutesSlice, uiAttSlice, categoriesSlice, uiSlice } from './'
import { authSlice } from "./auth";
import { ordersSlice } from "./orders";

export const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        categories: categoriesSlice.reducer,
        uiAtt: uiAttSlice.reducer,
        attributes: attibutesSlice.reducer,
        auth: authSlice.reducer,
        orders: ordersSlice.reducer,
    }
});