import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isCategoryModalOpen: false,
        productsSelected: []
    },
    reducers: {
        onOpenCategoryModal: ( state ) => {
            state.isCategoryModalOpen = true;
        },
        onCloseCategoryModal: ( state ) => {
            state.isCategoryModalOpen = false;
        },
        onAddProductsSelected: ( state, { payload } ) => {
            if (!state.productsSelected.some((product) => product.toLowerCase() === payload.toLowerCase())) {
                state.productsSelected.push( payload );
            }
        },
        onDeleteProductsSelected: ( state, { payload } ) => {
            state.productsSelected = state.productsSelected.filter( event => event !== payload );
        },
        onCleanProductsSelected: ( state ) => {
            state.productsSelected = []
        }
        
    }
});


// Action creators are generated for each case reducer function
export const { onOpenCategoryModal, onCloseCategoryModal, onAddProductsSelected, onDeleteProductsSelected, onCleanProductsSelected } = uiSlice.actions;