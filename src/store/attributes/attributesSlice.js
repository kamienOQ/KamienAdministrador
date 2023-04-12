import { createSlice } from '@reduxjs/toolkit';

export const attributesSlice = createSlice({
    name: 'attributes',
    initialState: {
        isSaving: false,
        message: {
            error: '',
            success: ''
        },
        ascending: '',
        numberAttributes: 0,
        attributes: [],
        attributesOnPage: [],
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
        onChargeAttributesUploaded: ( state, { payload } ) => {
            let duplicate = false
            if(state.attributes){
                state.attributes.forEach(attribute => {
                    if(attribute.attributeName === payload.attributeName)
                        duplicate = true
                });
                if(!duplicate){
                    console.log("Hola")
                    state.attributes.push( payload );
                }
            }else{
                state.attributes.push( payload );
            }
        },
        onSetAttributes: ( state, { payload } ) => {
            state.attributes = payload
        },
        onAddAttributeAtStart: ( state, { payload } ) => {
            state.attributes.unshift(payload);
        },
        onChargeAttributesByPage: ( state, { payload } ) => {
            state.attributesOnPage = payload;
        },
        onSetNumberAttributes: ( state, { payload } ) => {
            state.numberAttributes = payload
        },
        onAddImage: ( state, { payload } ) => {
            state.activeAttribute.image.name = payload[0];
            state.activeAttribute.image.url = payload[1];
        },
        onAddIcon: ( state, { payload } ) => {
            state.activeAttribute.icon.name = payload[0];
            state.activeAttribute.icon.url = payload[1];
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
        onCleanAttributes: ( state ) => {
            state.attributes = []
            state.activeAttribute = null;
        },
        onCleanActiveAttribute: ( state ) => {
            state.activeAttribute = null;
        },
        onCleanProductsUploaded: ( state ) => {
            state.productsUploaded = [];
        }
    }
});


// Action creators are generated for each case reducer function
export const { 
    onAddAttributeAtStart,
    onAddErrorMessage,
    onAddIcon, 
    onAddImage, 
    onAddNewAttribute, 
    onAddSuccessMessage,
    onChangeAscending,
    onChangeSavingNewAttribute, 
    onChargeAttributesByPage, 
    onChargeAttributesUploaded,
    onCleanActiveAttribute,
    onCleanAttributes,
    onCleanProductsUploaded,
    onDeleteAttribute,
    onSetActiveAttribute, 
    onSetAttributes,
    onSetNumberAttributes,
    onUpdateAttribute,
} = attributesSlice.actions;