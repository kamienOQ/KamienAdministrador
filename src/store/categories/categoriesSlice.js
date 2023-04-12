import { createSlice } from '@reduxjs/toolkit';

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {  
        isSaving: false,
        message: {
            error: '',
            success: ''
        },
        numberCategories: undefined,
        categories: [],
        isLoading: false,
        editing: false,
        filtering: false,
        filter: {},
        preCategory: {
            name: '',
            updatedName: false
        },
        page: 0,
        pageSize: 5,
        activeCategory: null, 
    },
    reducers: {
        onChangeSavingNewCategory: ( state, { payload } ) => {
            state.isSaving = payload;
        },
        onAddNewCategory: ( state ) => {
            const newCategory = {
                categoryName: '',
                categoryNameLowerCase: '',
                active: true,
                relatedProducts: [],
                relatedAttributes: [],
                imageCategory: {
                    name: null,
                    url: null
                },
                iconCategory: {
                    name: null,
                    url: null
                },
                date: new Date().getTime(),
            }
            state.activeCategory = newCategory;
        },
        onSetActiveCategory: ( state, { payload } ) => {
            state.activeCategory = payload;
        },
        onUpdateCategory: ( state, { payload } ) => {
            state.isSaving = false;
            state.categories = state.categories.map( category => {

                if (category.categoryName === payload.categoryName ){
                    return payload;
                }

                return category;
            });
            state.preCategory.updatedName = false;
        },
        onDeleteCategory: ( state, { payload } ) => {
            state.activeCategory = null;
            state.categories =  state.categories.filter( (category) => category.categoryName !== payload );
        },
        // onChargeCategoriesUploaded: ( state, { payload } ) => {
        //     let duplicate = false
        //     if(state.categories){
        //         state.categories.forEach(category => {
        //             if(category.categoryName === payload.categoryName)
        //                 duplicate = true
        //         });
        //         if(!duplicate){
        //             state.categories.push( payload );
        //         }
        //     }else{
        //         state.categories.push( payload );
        //     }
        // },
        onSetCategories: ( state, { payload } ) => {
            state.categories = payload;
            state.isLoading = false;
        },
        onSetNumberCategories: ( state, { payload } ) => {
            state.numberCategories = payload;
        },
        onAddCategoryAtStart: ( state, { payload } ) => {
            state.categories.unshift(payload);
        },
        onAddImageCategory: ( state, { payload } ) => {
            state.activeCategory.imageCategory.name = payload[0];
            state.activeCategory.imageCategory.url = payload[1];
        },
        onAddIconCategory: ( state, { payload } ) => {
            state.activeCategory.iconCategory.name = payload[0];
            state.activeCategory.iconCategory.url = payload[1];
        },
        onAddErrorMessageCategory: ( state, { payload } ) => {
            state.message.error = payload;
        },
        onAddSuccessMessageCategory: ( state, { payload } ) => {
            state.message.success = payload;
        },
        onAddCategoryNameLowerCase: ( state ) => {
            let formattedName = state.activeCategory.categoryName.toLowerCase();
            state.activeCategory.categoryNameLowerCase = formattedName.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        },
        onChangeActiveCategory: ( state ) => {
            state.activeCategory.active = !state.activeCategory.active

            state.categories = state.categories.map( category => {
                if (category.categoryName === state.activeCategory.categoryName ){
                    return state.activeCategory;
                }
                return category;
            });
        },
        onChangeEditingCategory: ( state, { payload } ) => {
            state.editing = payload;
        },
        onChangePreCategoryName: ( state, { payload } ) => {
            state.preCategory.name = payload;
        },
        onChangePreCategoryUpdated: ( state, { payload } ) => {
            state.preCategory.updatedName = payload;
        },
        onChangeFilteringCategory: ( state, { payload } )=> {
            state.filtering = payload
        },
        onChangeFilterCategory: ( state, { payload } )=> {
            state.filter = payload
        },
        onChangePageAndSizeCategory: ( state, { payload } )=> {
            state.page = payload.page;
            state.pageSize = payload.pageSize;
        },
        onCleanCategories: ( state ) => {
            state.categories = []
            state.activeCategory = null;
            state.isLoading = true;
        },
        onCleanActiveCategory: ( state ) => {
            state.activeCategory = null;
        },
    }
});


// Action creators are generated for each case reducer function
export const { 
    // onChargeCategoriesUploaded,
    onAddCategoryAtStart,
    onAddCategoryNameLowerCase, 
    onAddErrorMessageCategory,
    onAddIconCategory, 
    onAddImageCategory, 
    onAddNewCategory, 
    onAddSuccessMessageCategory,
    onChangeActiveCategory,
    onChangeEditingCategory,
    onChangeFilterCategory,
    onChangeFilteringCategory,
    onChangePageAndSizeCategory,
    onChangePreCategoryName,
    onChangePreCategoryUpdated,
    onChangeSavingNewCategory, 
    onCleanActiveCategory,
    onCleanCategories,
    onDeleteCategory,
    onSetActiveCategory,
    onSetCategories,
    onSetNumberCategories,
    onUpdateCategory,
} = categoriesSlice.actions;