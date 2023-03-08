import { configureStore } from '@reduxjs/toolkit'
import { categoriesSlice, uiSlice } from './'

export const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        categories: categoriesSlice.reducer,
    }
})
