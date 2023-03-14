import { configureStore } from '@reduxjs/toolkit'
import { attributesSlice ,uiSlice } from './'
import { authSlice } from "./auth";

export const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        auth: authSlice.reducer,
        attributes: attributesSlice.reducer,
    }
})
