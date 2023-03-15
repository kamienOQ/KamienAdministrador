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
        numberCategories: 0,
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
        onChargeProductUploaded: ( state, { payload } ) => {
            state.productsUploaded.push( payload );
        },
        onChargeProductsUploaded: ( state, { payload } ) => {
            let duplicate = false
            if(state.products){
                state.products.forEach(product => {
                    if(product.productName === payload.productName)
                        duplicate = true
                });
                if(!duplicate){
                    state.products.push( payload );
                }
            }else{
                state.products.push( payload );
            }
        },
        onSetNumberProducts: ( state, { payload } ) => {
            state.numberProducts = payload
        },
        onAddLowerCase: ( state ) => {
            state.activeProduct.productNameLowerCase = state.activeProduct.productName.toLowerCase();
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
        onCleanProductUploaded: ( state ) => {
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
    onChargeProductUploaded,
    onSetNumberProducts,
    onAddLowerCase,
    onAddImage, 
    onAddIcon, 
    onAddProducts, 
    onAddErrorMessage,
    onAddSuccessMessage,
    onCleanProducts,
    onCleanProductUploaded
} = productsSlice.actions;