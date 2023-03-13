import { createSlice } from '@reduxjs/toolkit';

export const attributesSlice = createSlice({
    name: 'attributes',
    initialState: {
        isSaving: false,
        message: {
            error: '',
            success: ''
        },
        productsUploaded: [],
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
        onChargeProductsUploaded: ( state, { payload } ) => {
            state.productsUploaded.push( payload );
        },
        onAddImage: ( state, { payload } ) => {
            state.activeAttribute.image.name = payload[0];
            state.activeAttribute.image.url = payload[1];
        },
        onAddIcon: ( state, { payload } ) => {
            state.activeAttribute.icon.name = payload[0];
            state.activeAttribute.icon.url = payload[1];
        },
        onAddProducts: ( state, { payload } ) => {
            state.activeAttribute.products = payload;
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
        onCleanProductsUploaded: ( state ) => {
            state.productsUploaded = [];
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
    onChargeProductsUploaded, 
    onAddImage, 
    onAddIcon, 
    onAddProducts, 
    onAddErrorMessage,
    onAddSuccessMessage,
    onCleanattributes ,
    onCleanProductsUploaded
} = attributesSlice.actions;