import { createSlice } from '@reduxjs/toolkit';

export const uiAttSlice = createSlice({
    name: 'ui',
    initialState: {
        isCategoryModalOpen: false,
        isModalViewOpen: false,
        attSelected: []
    },
    reducers: {
        onOpenCategoryModal: ( state ) => {
            state.isCategoryModalOpen = true;
        },
        onCloseCategoryModal: ( state ) => {
            state.isCategoryModalOpen = false;
        },
        onOpenModalView: ( state ) => {
            state.isModalViewOpen = true;
        },
        onCloseModalView: ( state ) => {
            state.isModalViewOpen = false;
        },
        onAddAttributesSelected: ( state, { payload } ) => {
            if (!state.attSelected.some((product) => product.toLowerCase() === payload.toLowerCase())) {
                state.attSelected.push( payload );
            }
        },
        onDeleteAttributesSelected: ( state, { payload } ) => {
            state.attSelected = state.attSelected.filter( event => event !== payload );
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
    onDeleteAttributesSelected,
    onAddAttributeNameLowerCase,
} = uiAttSlice.actions;