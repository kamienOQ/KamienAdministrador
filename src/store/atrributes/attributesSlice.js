import { createSlice } from '@reduxjs/toolkit';

export const attributesSlice = createSlice({
    name: 'attributes',
    initialState: {
        isSaving: false,
        message: {
            error: '',
            success: ''
        },
        categoriesUploaded: [],
        attributes: [],
        activeAttribute: null, 
    },
    reducers: {
        onChangeSavingNewAttribute: ( state, { payload } ) => {
            state.isSaving = payload;
        },
        onAddNewAttribute: ( state ) => {
            const newAttribute = {
                attributeName: '',
                categories: [],
                date: new Date().getTime(),
            }
            state.attributes.push( newAttribute );
            state.activeAttribute = newAttribute;
        },
        onSetActiveAttribute: ( state, { payload } ) => {
            state.activeAttribute = payload;
        },
        onUpdateAttribute: ( state, { payload } ) => {
            state.isSaving = false;
            state.attributes = state.attributes.map( attribute => {

                if (attribute.attributeName === payload.attributeName ){
                    return payload;
                }

                return attribute;
            });
        },
        onDeleteAttribute: ( state, { payload } ) => {
            state.activeAttribute = null;
            state.attributes =  state.attributes.filter( (attribute) => attribute.attributeName !== payload );
            
        },
        
        onChargeCategoriesByPage: ( state, { payload } ) => {
            state.categoriesOnPage = payload;
        },
        
        onChargeProductsUploaded: ( state, { payload } ) => {
            state.productsUploaded.push( payload );
        },
        onChargeCategoriesUploaded: ( state, { payload } ) => {
            let duplicate = false
            if(state.attributes){
                state.attributes.forEach(attribute => {
                    if(attribute.attributeName === payload.attributeName)
                        duplicate = true
                });
                if(!duplicate){
                    state.attributes.push( payload );
                }
            }else{
                state.attributes.push( payload );
            }
        },
        onAddCategories: ( state, { payload } ) => {
            state.activeAttribute.categories = payload;
        },
        onAddErrorMessage: ( state, { payload } ) => {
            state.message.error = payload;
        },
        onAddSuccessMessage: ( state, { payload } ) => {
            state.message.success = payload;
        },
        onCleanAttributes: ( state ) => {
            state.attributes = [];
            state.activeAttribute = null;
        },
        onCleanCategoriesUploaded: ( state ) => {
            state.categoriesUploaded = [];
        }
    }
});


// Action creators are generated for each case reducer function
export const { 
    onChangeSavingNewAttribute, 
    onAddNewAttribute, 
    onSetActiveAttribute, 
    onUpdateAttribute, 
    onDeleteAttribute,
    onChargeCategoriesUploaded,
    onAddCategories, 
    onAddErrorMessage,
    onAddSuccessMessage,
    onCleanAttributes ,
    onCleanCategoriesUploaded
} = attributesSlice.actions;