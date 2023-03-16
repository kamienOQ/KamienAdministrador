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
        categoriesOnPage: [],
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
            let duplicate = false
            if(state.categories){
                state.categories.forEach(category => {
                    if(category.categoryName === payload.categoryName)
                        duplicate = true
                });
                if(!duplicate){
                    state.categories.push( payload );
                }
            }else{
                state.categories.push( payload );
            }
        },
        onAddCategoryAtStart: ( state, { payload } ) => {
            state.categories.unshift(payload);
        },
        onChargeCategoriesByPage: ( state, { payload } ) => {
            state.categoriesOnPage = payload;
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
        onChangeAscending: ( state, { payload } ) => {
            state.ascending = payload
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
        onCleanActiveCategory: ( state ) => {
            state.activeCategory = null;
        },
        onCleanProductsUploaded: ( state ) => {
            state.productsUploaded = [];
        }
    }
});


// Action creators are generated for each case reducer function
export const { 
    onAddCategoryAtStart,
    onAddErrorMessage,
    onAddIcon, 
    onAddImage, 
    onAddLowerCase, 
    onAddNewCategory, 
    onAddSuccessMessage,
    onChangeAscending,
    onChangeSavingNewCategory, 
    onChargeCategoriesByPage, 
    onChargeCategoriesUploaded,
    onCleanActiveCategory,
    onCleanCategories,
    onCleanProductsUploaded,
    onDeleteCategory,
    onSetActiveCategory, 
    onSetNumberCategories,
    onUpdateCategory,
} = categoriesSlice.actions;