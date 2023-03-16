import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isCategoryModalOpen: false,
        totalPages: 1,
        page: 1,
    },
    reducers: {
        onSetTotalPages: ( state, { payload } ) => {
            state.totalPages = payload;
        },
        onUpPage: ( state ) => {
            if(state.page < state.totalPages){
                state.page++;
            }
        },
        onDownPage: ( state ) => {
            if(state.page > 1){
                state.page--;
            }
        },
        onChangePage: ( state, { payload } ) => {
            state.page = payload;
        },
        onRestorePage: ( state ) => {
            state.page = 1;
        },
        onOpenCategoryModal: ( state ) => {
            state.isCategoryModalOpen = true;
        },
        onCloseCategoryModal: ( state ) => {
            state.isCategoryModalOpen = false;
        }
        
    }
});


// Action creators are generated for each case reducer function
export const { 
    onSetTotalPages,
    onUpPage,
    onDownPage,
    onChangePage,
    onRestorePage,
    onOpenCategoryModal, 
    onCloseCategoryModal, 
} = uiSlice.actions;