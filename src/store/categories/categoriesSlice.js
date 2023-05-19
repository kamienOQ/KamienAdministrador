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
        createSuccess: false,
        editSuccess: false,
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

                if (category.categoryName === state.preCategory.name ){
                    return payload;
                }

                return category;
            });
            state.preCategory.updatedName = false;
            state.editing = false;
        },
        onDeleteCategory: ( state, { payload } ) => {
            state.activeCategory = null;
            state.categories =  state.categories.filter( (category) => category.categoryName !== payload );
        },
        // onChargeCategoriesUploaded: ( state, { payload, prevName } ) => {
        //     let duplicate = false
        //     if(prevName !== payload.categoryName){}
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
        onChangeActive: ( state ) => {
            state.activeCategory.active = !state.activeCategory.active

            state.categories = state.categories.map( category => {
                if (category.categoryName === state.activeCategory.categoryName ){
                    return state.activeCategory;
                }
                return category;
            });

            if(!state.activeCategory.active === true){
                state.activeCategory = true;
                state.inactiveSuccess = false;
            }else{
                state.activeCategory = false;
                state.inactiveSuccess = true;
            }
        },
        onChangeEditing: ( state, { payload } ) => {
            state.editing = payload;
        },
        onChangePreCategoryName: ( state, { payload } ) => {
            state.preCategory.name = payload;
        },
        onChangePreCategoryUpdated: ( state, { payload } ) => {
            state.preCategory.updatedName = payload;
        },
        onChangeFiltering: ( state, { payload } )=> {
            state.filtering = payload
        },
        onChangeFilter: ( state, { payload } )=> {
            state.filter = payload
        },
        onChangePageAndSize: ( state, { payload } )=> {
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
    // onChargeCategoriesUploaded,
    onAddCategoryAtStart,
    onAddCategoryNameLowerCase, 
    onAddErrorMessage,
    onAddIcon, 
    onAddImage, 
    onAddNewCategory, 
    onAddSuccessMessage,
    onChangeActive,
    onChangeEditing,
    onChangeFilter,
    onChangeFiltering,
    onChangePageAndSize,
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
    onChangeCreateSuccess,
    onChangeEditSuccess,
} = categoriesSlice.actions;