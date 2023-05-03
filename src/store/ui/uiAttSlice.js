import { createSlice } from '@reduxjs/toolkit';

export const uiAttSlice = createSlice({
    name: 'uiAtt',
    initialState: {
        isCategoryModalOpen: false,
        isModalViewOpen: false,
        attributesSelected: [],
        categoriesSelected: [],
        listAttributesSelected: [],
    },
    reducers: {
        onOpenCategoryModal: ( state ) => {
            state.isCategoryModalOpen = true;
        },
        onCloseCategoryModal: ( state ) => {
            state.isCategoryModalOpen = false;
            state.attributesSelected = [];
            state.categoriesSelected = [];
            state.listAttributesSelected = []
        },
        onOpenModalView: ( state ) => {
            state.isModalViewOpen = true;
        },
        onCloseModalView: ( state ) => {
            state.isModalViewOpen = false;
        },
        onAddAttributesSelected: ( state, { payload } ) => {
            if (!state.attributesSelected.some((attribute) => attribute.toLowerCase() === payload.toLowerCase())) {
                state.attributesSelected.push( payload );
            }
        },
        onAddCategoriesSelected: ( state, { payload } ) => {
            if (!state.categoriesSelected.some((category) => category.toLowerCase() === payload.toLowerCase())) {
                state.categoriesSelected.push( payload );
            }
        },
        onAddListAttributesSelected: ( state, { payload } ) => {
            if (!state.listAttributesSelected.some((listAttributes) => listAttributes.toLowerCase() === payload.toLowerCase())) {
                state.listAttributesSelected.push( payload );
            }
        },
        onSetAttributesSelected: ( state, { payload } ) =>{
            state.attributesSelected = payload;
        },
        onSetListAttributesSelected: ( state, { payload } ) =>{
            state.listAttributesSelected = payload;
        },
        onSetCategoriesSelected: ( state, { payload } ) =>{
            state.categoriesSelected = payload;
        },
        onDeleteCategoriesSelected: ( state, { payload } ) => {
            state.categoriesSelected = state.categoriesSelected.filter( event => event !== payload );
        },
        onDeleteAttributesSelected: ( state, { payload } ) => {
            state.attributesSelected = state.attributesSelected.filter( event => event !== payload );
        },
        onDeleteListAttributesSelected: ( state, { payload } ) => {
            state.listAttributesSelected = state.listAttributesSelected.filter( event => event !== payload );
        },
        onAddAttributeNameLowerCase: ( state ) => {
            let formattedName = state.activeCategory.categoryName.toLowerCase();
            state.activeCategory.categoryNameLowerCase = formattedName.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        },
        
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
    onAddAttributesSelected,
    onAddListAttributesSelected,
    onAddCategoriesSelected,
    onDeleteAttributesSelected,
    onDeleteListAttributesSelected,
    onDeleteCategoriesSelected,
    onAddAttributeNameLowerCase,
    onSetAttributesSelected,
    onSetListAttributesSelected,
    onSetCategoriesSelected
} = uiAttSlice.actions;