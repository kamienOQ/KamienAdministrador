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
        onAddNewCategory: ( state, { payload } ) => {
            if (!state.categories.some((category) => category.toLowerCase() === payload.toLowerCase())) {
                state.categories.push( payload );
            }else{
                state.messageError = `La categoría ${ action } ya había sido creada previamente`
            }
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
                    return payload
                }

                return category;
            });
        },
        onDeleteCategory: ( state, { payload } ) => {
            state.activeCategory = null;
            state.categories =  state.categories.filter( (category) => category.categoryName !== payload );
            
        },
        onAddImages: ( state, { payload } ) => {
            console.log(state.activeCategory.images)
            state.activeCategory.images = [ ...state.activeCategory.images, ...payload ]
        },
        onAddProducts: ( state, { payload } ) => {
            state.activeCategory.products = payload
        }
    }
});


// Action creators are generated for each case reducer function
export const { onAddNewCategory, onSetActiveCategory, onSetCategory, onUpdateCategory, onDeleteCategory, onAddImages, onAddProducts } = categoriesSlice.actions;