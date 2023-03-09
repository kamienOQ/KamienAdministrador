import { createSlice } from '@reduxjs/toolkit';

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        isSaving: false,
        messageError: '',
        categories: [],
        activeCategory: null, 
    },
    reducers: {
        onAddNewCategory: ( state ) => {
            const newNote = {
                categoryName: '',
                products: [],
                image: null,
                icon: null,
                date: new Date().getTime(),
            }
            state.categories.push( newNote );
            state.activeCategory = newNote;
        },
        onSetActiveCategory: ( state, { payload } ) => {
            state.activeCategory = payload;
        },
        onSetCategory: ( state, { payload } ) => {
            state.categories = payload;
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
        onAddImage: ( state, { payload } ) => {
            state.activeCategory.image = payload;
        },
        onAddIcon: ( state, { payload } ) => {
            state.activeCategory.icon = payload;
        },
        onAddProducts: ( state, { payload } ) => {
            state.activeCategory.products = payload;
        },
        OnCleanCategories: ( state ) => {
            state.categories = [];
            state.activeCategory = null;
        }
    }
});


// Action creators are generated for each case reducer function
export const { onAddNewCategory, onSetActiveCategory, onSetCategory, onUpdateCategory, onDeleteCategory, onAddImage, onAddIcon, onAddProducts, OnCleanCategories } = categoriesSlice.actions;