import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isProductModalOpen: false,
        isCategoryModalOpen: false,
        isModalViewOpenProduct: false,
        totalPages: 1,
        page: 1,
        searching: '',
        categoriesSelected: []
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
        onSearchingName: (state, { payload }) => {
            state.searching = payload;
        },
        onOpenProductModal: ( state ) => {
            state.isProductModalOpen = true;
        },
        onCloseProductModal: ( state ) => {
            state.isProductModalOpen = false;
            state.categoriesSelected = [];
        },
        onAddCategoriesSelected: ( state, { payload } ) => {
            if (!state.categoriesSelected.some((category) => category.toLowerCase() === payload.toLowerCase())) {
                state.categoriesSelected.push( payload );
            }
        },
        onDeleteCategoriesSelected: ( state, { payload } ) => {
            state.categoriesSelected = state.categoriesSelected.filter( event => event !== payload );
        },
        // onCleanCategorySelected: ( state ) => {
        //     state.categoriesSelected = [];
        // },
        onOpenCategoryModal: ( state ) => {
            state.isCategoryModalOpen = true;
        },
        onCloseCategoryModal: ( state ) => {
            state.isCategoryModalOpen = false;
        },
        onOpenModalViewProduct: ( state ) => {
            state.isModalViewOpenProduct = true;
        },
        onCloseModalViewProduct: ( state ) => {
            state.isModalViewOpenProduct = false;
        },
        onOpenModalViewCategory: ( state ) => {
            state.isModalViewOpenCategory = true;
        },
        onCloseModalViewCategory: ( state ) => {
            state.isModalViewOpenCategory = false;
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
    onSearchingName,
    onOpenProductModal, 
    onCloseProductModal, 
    onAddCategoriesSelected,
    onDeleteCategoriesSelected, 
    // onCleanCategorySelected, 
    onOpenCategoryModal, 
    onCloseCategoryModal, 
    onOpenModalViewProduct,
    onCloseModalViewProduct,
    onOpenModalViewCategory,
    onCloseModalViewCategory,
} = uiSlice.actions;