import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isAttributeModalOpen: false,
        categoriesSelected: []
    },
    reducers: {
        onOpenAttributeModal: ( state ) => {
            state.isAttributeModalOpen = true;
        },
        onCloseAttributeModal: ( state ) => {
            state.isAttributeModalOpen = false;
        },
        onAddCategoriesSelected: ( state, { payload } ) => {
            if (!state.categoriesSelected.includes(payload)) {
                state.categoriesSelected.push( payload );
            }
        },
        onDeleteCategoriesSelected: ( state, { payload } ) => {
            state.categoriesSelected = state.categoriesSelected.filter( event => event !== payload );
        },
        onCleanCategoriesSelected: ( state ) => {
            state.categoriesSelected = []
        }
        
    }
});


// Action creators are generated for each case reducer function
export const { onOpenAttributeModal, onCloseAttributeModal, onAddCategoriesSelected, onDeleteCategoriesSelected, onCleanCategoriesSelected } = uiSlice.actions;