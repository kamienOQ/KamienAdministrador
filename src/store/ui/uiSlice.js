import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isAttributeModalOpen: false,
        productsSelected: []
    },
    reducers: {
        onOpenAttributeModal: ( state ) => {
            state.isAttributeModalOpen = true;
        },
        onCloseAttributeModal: ( state ) => {
            state.isAttributeModalOpen = false;
        },
        onAddProductsSelected: ( state, { payload } ) => {
            if (!state.productsSelected.includes(payload)) {
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
export const { onOpenAttributeModal, onCloseAttributeModal, onAddProductsSelected, onDeleteProductsSelected, onCleanProductsSelected } = uiSlice.actions;