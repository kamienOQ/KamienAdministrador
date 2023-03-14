import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth';
import { uiSlice, productsSlice, categoriesSlice } from './';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        ui: uiSlice.reducer,
        products: productsSlice.reducer,
        categories: categoriesSlice.reducer,
    }
});