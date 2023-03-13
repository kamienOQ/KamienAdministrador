import { configureStore } from '@reduxjs/toolkit'
import { attributesSlice ,uiSlice } from './'

export const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        attributes: attributesSlice.reducer,
    }
})
