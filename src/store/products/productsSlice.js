import { createSlice } from '@reduxjs/toolkit';

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        isSaving: false,
        message: {
            error: '',
            success: ''
        },
        productsUploaded: [],
        products: [],
        activeProduct: null, 
    },
    reducers: {
        onChangeSavingNewProduct: ( state, { payload } ) => {
            state.isSaving = payload;
        },
        onAddNewProduct: ( state ) => {
            const newProduct = {
                productName: '',
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
            state.products.push( newProduct );
            state.activeProduct = newProduct;
        },
        onSetActiveProduct: ( state, { payload } ) => {
            state.activeProduct = payload;
        },
        onUpdateProduct: ( state, { payload } ) => {
            state.isSaving = false;
            state.products = state.products.map( product => {

                if (product.productName === payload.productName ){
                    return payload
                }

                return product;
            });
        },
        onDeleteProduct: ( state, { payload } ) => {
            state.activeProduct = null;
            state.products =  state.products.filter( (product) => product.productName !== payload );
            
        },
        onChargeProductsUploaded: ( state, { payload } ) => {
            state.productsUploaded.push( payload );
        },
        onAddImage: ( state, { payload } ) => {
            state.activeProduct.image.name = payload[0];
            state.activeProduct.image.url = payload[1];
        },
        onAddIcon: ( state, { payload } ) => {
            state.activeProduct.icon.name = payload[0];
            state.activeProduct.icon.url = payload[1];
        },
        onAddProducts: ( state, { payload } ) => {
            state.activeProduct.products = payload;
        },
        onAddErrorMessage: ( state, { payload } ) => {
            state.message.error = payload;
        },
        onAddSuccessMessage: ( state, { payload } ) => {
            state.message.success = payload;
        },
        onCleanProducts: ( state ) => {
            state.products = [];
            state.activeProduct = null;
        },
        onCleanProductsUploaded: ( state ) => {
            state.productsUploaded = [];
        }
    }
});


// Action creators are generated for each case reducer function
export const { 
    onChangeSavingNewProduct, 
    onAddNewProduct, 
    onSetActiveProduct, 
    onUpdateProduct, 
    onDeleteProduct,
    onChargeProductsUploaded, 
    onAddImage, 
    onAddIcon, 
    onAddProducts, 
    onAddErrorMessage,
    onAddSuccessMessage,
    onCleanProducts,
    onCleanProductsUploaded
} = productsSlice.actions;