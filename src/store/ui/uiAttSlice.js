import { createSlice } from '@reduxjs/toolkit';

export const uiAttSlice = createSlice({
    name: 'ui',
    initialState: {
        isCategoryModalOpen: false,
        isModalViewOpen: false,
        categoriesSelected: []
    },
    reducers: {
        onOpenCategoryModal: ( state ) => {
            state.isCategoryModalOpen = true;
        },
        onCloseCategoryModal: ( state ) => {
            state.isCategoryModalOpen = false;
            state.categoriesSelected = [];
        },
        onOpenModalView: ( state ) => {
            state.isModalViewOpen = true;
        },
        onCloseModalView: ( state ) => {
            state.isModalViewOpen = false;
        },
        onAddCategoriesSelected: ( state, { payload } ) => {
            if (!state.categoriesSelected.some((category) => category.toLowerCase() === payload.toLowerCase())) {
                state.categoriesSelected.push( payload );
            }
        },

        onSetCategoriesSelected: ( state, { payload } ) =>{
            state.categoriesSelected = payload;
            
        },

        onDeleteAttributesSelected: ( state, { payload } ) => {
            state.categoriesSelected= state.categoriesSelected.filter( event => event !== payload );
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
    onAddCategoriesSelected,
    onDeleteAttributesSelected,
    onAddAttributeNameLowerCase,
    onSetCategoriesSelected
} = uiAttSlice.actions;