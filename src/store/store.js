import { configureStore } from '@reduxjs/toolkit'
import { attibutesSlice, uiAttSlice } from './'
import { authSlice } from "./auth";
import { ordersSlice } from "./orders";

export const store = configureStore({
    reducer: {
        ui: uiAttSlice.reducer,
        attributes: attibutesSlice.reducer,
        auth: authSlice.reducer,
        orders: ordersSlice.reducer,
    }
});