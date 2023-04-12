import { createSlice } from '@reduxjs/toolkit';

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        isSaving: false,
        message: {
            error: '',
            success: ''
        },
        numberProducts: undefined,
        products: [],
        isLoading: false,
        editing: false,
        filtering: false,
        filter: {},
        preProduct: {
            name: '',
            updatedName: false
        },
        page: 0,
        pageSize: 5,
        activeProduct: null, 
    },
    reducers: {
        onChangeSavingNewProduct: ( state, { payload } ) => {
            state.isSaving = payload;
        },
        onAddNewProduct: ( state ) => {
            const newProduct = {
                productName: '',
                productNameLowerCase: '',
                products: [],
                active: true,
                relatedProducts: [],
                relatedAttributes: [],
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
            state.preProduct.updatedName = false;
        },
        onDeleteProduct: ( state, { payload } ) => {
            state.activeProduct = null;
            state.products =  state.products.filter( (product) => product.productName !== payload );
            
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
        onSetProducts: ( state, { payload } ) => {
            state.products = payload;
            state.isLoading = false;
        },
        onSetNumberProducts: ( state, { payload } ) => {
            state.numberProducts = payload
        },
        onAddProductAtStart: ( state, { payload } ) => {
            state.products.unshift(payload);
        },  
        onAddImageProduct: ( state, { payload } ) => {
            state.activeProduct.image.name = payload[0];
            state.activeProduct.image.url = payload[1];
        },
        onAddIconProduct: ( state, { payload } ) => {
            state.activeProduct.icon.name = payload[0];
            state.activeProduct.icon.url = payload[1];
        },
        onChargeProductsByPage: ( state, { payload } ) => {
            state.productsOnPage = payload;
        },  
        onAddLowerCase: ( state ) => {
            state.activeProduct.productNameLowerCase = state.activeProduct.productName.toLowerCase();
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
        onAddProductNameLowerCase: ( state ) => {
            let formattedName = state.activeProduct.productName.toLowerCase();
            state.activeProduct.productNameLowerCase = formattedName.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        },
        onChangeActive: ( state ) => {
            state.activeProduct.active = !state.activeProduct.active

            state.products = state.products.map( product => {
                if (product.productName === state.activeProduct.productName ){
                    return state.activeProduct;
                }
                return product;
            });
        },
        onChangeEditing: ( state, { payload } ) => {
            state.editing = payload;
        },
        onChangePreProductName: ( state, { payload } ) => {
            state.preProduct.name = payload;
        },
        onChangePreProductUpdated: ( state, { payload } ) => {
            state.preProduct.updatedName = payload;
        },
        onChangeFilterings: ( state, { payload } )=> {
            state.filtering = payload
        },
        onChangeFilters: ( state, { payload } )=> {
            state.filter = payload
        },
        onChangePageAndSize: ( state, { payload } )=> {
            state.page = payload.page;
            state.pageSize = payload.pageSize;
        },
        onCleanProducts: ( state ) => {
            state.products = [];
            state.activeProduct = null;
            state.isLoading = true;
        },
        onCleanActiveProduct: ( state ) => {
            state.activeProduct = null;
        },
        onCleanProductsUploaded: ( state ) => {
            state.productsUploaded = [];
        },
    }
});


// Action creators are generated for each case reducer function
export const { 
    onAddProductAtStart,
    onAddErrorMessage,
    onAddIconProduct, 
    onAddImageProduct, 
    onAddLowerCase, 
    onAddNewProduct, 
    onAddSuccessMessage,
    onChangeAscending,
    onChangeSavingNewProduct, 
    onChargeProductsByPage, 
    onChargeProductsUploaded,
    onCleanActiveProduct,
    onCleanProducts,
    onCleanProductsUploaded,
    onDeleteProduct,
    onSetActiveProduct, 
    onSetNumberProducts,
    onUpdateProduct,
    onAddProducts,
    onSetProducts,
    onAddProductNameLowerCase, 
    onChangeActive,
    onChangeEditing,
    onChangeFilters,
    onChangeFilterings,
    onChangePageAndSize,
    onChangePreProductName,
    onChangePreProductUpdated
} = productsSlice.actions;