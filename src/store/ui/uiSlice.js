import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isCategoryModalOpen: false,
        isModalViewOpen: false,
        isModalViewOpenProduct: false,
        totalPages: 1,
        page: 1,
        searching: '',
        categoriesSelected: '',
        attributesSelected: [],
        listAttributesSelected: [],
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
            state.categoriesSelected = '';
            state.attributesSelected = [];
            state.listAttributesSelected = [];
        },
        onAddCategoriesSelected: ( state, { payload } ) => {
            state.categoriesSelected = payload;

        },
        onDeleteCategoriesSelected: ( state ) => {
            state.categoriesSelected = '';
        },
        onAddAttributesSelected: ( state, { payload } ) => {
            if (!state.attributesSelected.some((attribute) => attribute.toLowerCase() === payload.toLowerCase())) {
                state.attributesSelected.push( payload );
            }
        },
        onDeleteAttributesSelected: ( state, { payload } ) => {
            state.attributesSelected = state.attributesSelected.filter( event => event !== payload );
            state.listAttributesSelected = state.listAttributesSelected.filter( event => event.attributeSelected !== payload );
        },
        onAddListAttributesSelected: ( state, { payload } ) => {
            if (!state.listAttributesSelected.some((listAttribute) => listAttribute.feature.toLowerCase() === payload.feature.toLowerCase())) {
                state.listAttributesSelected.push( payload );
            }
        },
        onDeleteListAttributesSelected: ( state, { payload } ) => {
            console.log(payload)
            state.listAttributesSelected = state.listAttributesSelected.filter( event => event.attributeSelected !== payload.attributeSelected || event.feature !== payload.feature );
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
            state.isModalViewOpen = true;
        },
        onCloseModalViewCategory: ( state ) => {
            state.isModalViewOpen = false;
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
    onOpenModalView,
    onCloseModalView, 
    onSearchingName,
    onOpenProductModal, 
    onCloseProductModal, 
    onAddCategoriesSelected,
    onDeleteCategoriesSelected, 
    onAddAttributesSelected,
    onDeleteAttributesSelected,
    onAddListAttributesSelected,
    onDeleteListAttributesSelected,
    onOpenModalViewProduct,
    onCloseModalViewProduct,
    onOpenModalViewCategory,
    onCloseModalViewCategory,
} = uiSlice.actions;