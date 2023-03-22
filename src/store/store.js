<<<<<<< HEAD
import { configureStore } from '@reduxjs/toolkit'
import { attributesSlice ,uiSlice } from './'
import { authSlice } from "./auth";
import { ordersSlice } from "./orders";

export const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        auth: authSlice.reducer,
        attributes: attributesSlice.reducer,
        orders: ordersSlice.reducer,
=======
import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth";
import { uiSlice, productsSlice, categoriesSlice, ordersSlice  } from './';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
    products: productsSlice.reducer,
    categories: categoriesSlice.reducer,
    orders: ordersSlice.reducer,
>>>>>>> origin/salvarado
  },
});
