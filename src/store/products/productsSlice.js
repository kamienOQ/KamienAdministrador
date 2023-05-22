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
        products: '',
        categories: '',
        attributes: [],
        listAttributes: [],
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
        createSuccess: false,
        editSuccess: false, 
    },
    reducers: {
        onChangeSavingNewProduct: ( state, { payload } ) => {
            state.isSaving = payload;
        },
        onAddNewProduct: ( state ) => {
            const newProduct = {
                productName: '',
                productNameLowerCase: '',
                products: '',
                active: true,
                relatedCategories: [],
                relatedAttributes: [],
                relatedListAttributes: [],
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
        onSetRelatedCategories: ( state, { payload } ) => {
            state.activeProduct.relatedCategories = payload;
        },
        onSetRelatedAttributes: ( state, { payload } ) => {
            state.activeProduct.relatedAttributes = payload;
        },
        onSetRelatedListAttributes: ( state, { payload } ) => {
            state.activeProduct.relatedListAttributes = payload;
        },
        onUpdateProduct: ( state, { payload } ) => {
            state.isSaving = false;
            state.products = state.products.map( product => {

                if (product.productName === state.preProduct.name ){
                    return payload
                }

                return product;
            });
            state.preProduct.updatedName = false;
            state.editing = false;
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
        onSetCategories: ( state, { payload } ) => {
            state.categories.push( payload );
            state.isLoading = false;    
        },
        onSetAttributes: ( state, { payload } ) => {
            state.attributes.push( payload );
            state.isLoading = false;    
        },
        onSetListAttributes: ( state, { payload } ) => {
            state.listAttributes.push( payload );
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
            state.activeProduct = null;
            state.isLoading = true;
        },
        onCleanCategories: ( state ) => {
            state.categories = [];
        },
        onCleanAttributes: ( state ) => {
            state.attributes = [];
        },
        onCleanListAttributes: ( state ) => {
            state.listAttributes = [];
        },
        onCleanActiveProduct: ( state ) => {
            state.activeProduct = null;
        },
        onCleanProductsUploaded: ( state ) => {
            state.productsUploaded = [];
        },
        onChangeCreateSuccess: (state, action) => {
            state.createSuccess = action.payload;
        },
        onChangeEditSuccess: (state, action) => {
            state.editSuccess = action.payload;
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
    onCleanCategories,
    onCleanAttributes,
    onCleanListAttributes,
    onCleanProductsUploaded,
    onDeleteProduct,
    onSetActiveProduct, 
    onSetNumberProducts,
    onUpdateProduct,
    onAddProducts,
    onSetProducts,
    onSetCategories,
    onSetAttributes,
    onSetListAttributes,
    onSetRelatedCategories,
    onSetRelatedAttributes,
    onSetRelatedListAttributes,
    onAddProductNameLowerCase, 
    onChangeActive,
    onChangeEditing,
    onChangeFilters,
    onChangeFilterings,
    onChangePageAndSize,
    onChangePreProductName,
    onChangePreProductUpdated,
    onChangeCreateSuccess,
    onChangeEditSuccess,
} = productsSlice.actions;