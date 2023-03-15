import { createSlice } from '@reduxjs/toolkit';

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        isSaving: false,
        message: {
            error: '',
            success: ''
        },
        ascending: '',
        numberCategories: 0,
        categories: [],
        activeCategory: null, 
    },
    reducers: {
        onChangeSavingNewCategory: ( state, { payload } ) => {
            state.isSaving = payload;
        },
        onAddNewCategory: ( state ) => {
            const newCategory = {
                categoryName: '',
                categoryNameLowerCase: '',
                products: [],
                image: {
                    name: null,
                    url: null
                },
                icon: {
                    name: null,
                    url: null
                },
                date: new Date().getTime(),
            }
            state.activeCategory = newCategory;
        },
        onSetActiveCategory: ( state, { payload } ) => {
            state.activeCategory = payload;
        },
        onUpdateCategory: ( state, { payload } ) => {
            state.isSaving = false;
            state.categories = state.categories.map( category => {

                if (category.categoryName === payload.categoryName ){
                    return payload;
                }

                return category;
            });
        },
        onDeleteCategory: ( state, { payload } ) => {
            state.activeCategory = null;
            state.categories =  state.categories.filter( (category) => category.categoryName !== payload );
            
        },
        onChargeCategoriesUploaded: ( state, { payload } ) => {
            state.categories.push( payload );
        },
        onChangeAscending: ( state, { payload } ) => {
            state.ascending = payload
        },
        onSetNumberCategories: ( state, { payload } ) => {
            state.numberCategories = payload
        },
        onAddLowerCase: ( state ) => {
            state.activeCategory.categoryNameLowerCase = state.activeCategory.categoryName.toLowerCase();
        },
        onAddImage: ( state, { payload } ) => {
            state.activeCategory.image.name = payload[0];
            state.activeCategory.image.url = payload[1];
        },
        onAddIcon: ( state, { payload } ) => {
            state.activeCategory.icon.name = payload[0];
            state.activeCategory.icon.url = payload[1];
        },
        onAddErrorMessage: ( state, { payload } ) => {
            state.message.error = payload;
        },
        onAddSuccessMessage: ( state, { payload } ) => {
            state.message.success = payload;
        },
        onCleanCategories: ( state ) => {
            state.categories = []
            state.activeCategory = null;
        },
        onCleanProductsUploaded: ( state ) => {
            state.productsUploaded = [];
        }
    }
});


// Action creators are generated for each case reducer function
export const { 
    onChangeSavingNewCategory, 
    onAddNewCategory, 
    onSetActiveCategory, 
    onUpdateCategory, 
    onDeleteCategory,
    onChargeCategoriesUploaded,
    onChangeAscending,
    onSetNumberCategories,
    onAddLowerCase, 
    onAddImage, 
    onAddIcon, 
    onAddErrorMessage,
    onAddSuccessMessage,
    onCleanCategories ,
    onCleanProductsUploaded
} = categoriesSlice.actions;