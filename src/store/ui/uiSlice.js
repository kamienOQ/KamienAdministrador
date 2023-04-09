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
        productsSelected: []
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
        },
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
    onAddProductsSelected, 
    onDeleteProductsSelected, 
    onCleanProductsSelected, 
    onOpenCategoryModal, 
    onCloseCategoryModal, 
    onOpenModalViewProduct,
    onCloseModalViewProduct,
    onOpenModalViewCategory,
    onCloseModalViewCategory,
} = uiSlice.actions;