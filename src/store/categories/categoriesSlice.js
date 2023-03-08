import { createSlice } from '@reduxjs/toolkit';

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        messageError: '',
        categories: [],
        activeCategory: null, 
    },
    reducers: {
        onAddNewCategory: (state, action ) => {
            if (!state.categories.some((category) => category.toLowerCase() === payload.toLowerCase())) {
                state.categories.push( action.payload );
            }else{
                state.messageError = `La categoría ${ action } ya había sido creada previamente`
            }
        },
        onSetActiveCategory: (state, action ) => {
            state.activeCategory = action.payload;
        },
        onSetCategory: (state, action ) => {
            state.categories = action.payload;
        },
        onUpdateCategory: (state, action ) => {
            state.isSaving = false;
            state.categories = state.categories.map( category => {

                if (category.name === action.payload.name ){
                    return action.payload
                }

                return category;
            });
        },
        onDeleteCategory: (state, action ) => {
            state.activeCategory = null;
            state.categories =  state.categories.filter( (category) => category.name !== action.payload );
            
        },
    }
});


// Action creators are generated for each case reducer function
export const { onAddNewCategory, onSetActiveCategory, onSetCategory, onUpdateCategory, onDeleteCategory } = categoriesSlice.actions;