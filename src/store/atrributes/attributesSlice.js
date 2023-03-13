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
        onChargeCategoriesUploaded: ( state, { payload } ) => {
            state.categoriesUploaded.push( payload );
        },
        onAddImage: ( state, { payload } ) => {
            state.activeAttribute.image.name = payload[0];
            state.activeAttribute.image.url = payload[1];
        },
        onAddIcon: ( state, { payload } ) => {
            state.activeAttribute.icon.name = payload[0];
            state.activeAttribute.icon.url = payload[1];
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
        onCleanattributes: ( state ) => {
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
    onAddImage, 
    onAddIcon, 
    onAddCategories, 
    onAddErrorMessage,
    onAddSuccessMessage,
    onCleanattributes ,
    onCleanCategoriesUploaded
} = attributesSlice.actions;