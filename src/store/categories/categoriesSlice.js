import { createSlice } from '@reduxjs/toolkit';

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        active: true,
        isSaving: false,
        message: {
            error: '',
            success: ''
        },
        numberCategories: undefined,
        categories: [],
        relatedProducts: [],
        relatedAttributes: [],
        isLoading: false,
        editing: false,
        filtering: false,
        filter: {},
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
        onAddImage: ( state, { payload } ) => {
            state.activeCategory.image.name = payload[0];
            state.activeCategory.image.url = payload[1];
        },
        onAddIcon: ( state, { payload } ) => {
            state.activeCategory.icon.name = payload[0];
            state.activeCategory.icon.url = payload[1];
        },
        onAddErrorMessage: ( state, { payload } ) => {
            state.message.error = payload;
        },
        onAddSuccessMessage: ( state, { payload } ) => {
            state.message.success = payload;
        },
        onAddCategoryNameLowerCase: ( state ) => {
            let formattedName = state.activeCategory.categoryName.toLowerCase();
            state.activeCategory.categoryNameLowerCase = formattedName.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        },
        onChangeEditing: ( state, { payload } ) => {
            state.editing = payload;
        },
        onChangeFiltering: ( state, { payload } )=> {
            state.filtering = payload
        },
        onChangeFilter: ( state, { payload } )=> {
            state.filter = payload
        },
        onChangePageSize: ( state, { payload } )=> {
            state.pageSize = payload
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
    onAddCategoryAtStart,
    onAddCategoryNameLowerCase, 
    onAddErrorMessage,
    onAddIcon, 
    onAddImage, 
    onAddNewCategory, 
    onAddSuccessMessage,
    onChangeEditing,
    onChangeFilter,
    onChangeFiltering,
    onChangePageSize,
    onChangeSavingNewCategory, 
    // onChargeCategoriesUploaded,
    onCleanActiveCategory,
    onCleanCategories,
    onDeleteCategory,
    onSetActiveCategory,
    onSetCategories,
    onSetNumberCategories,
    onUpdateCategory,
} = categoriesSlice.actions;