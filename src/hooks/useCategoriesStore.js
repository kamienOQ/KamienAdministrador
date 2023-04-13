import { useDispatch, useSelector } from "react-redux";
import { onAddErrorMessageCategory, onAddIconCategory, onAddImageCategory, onAddNewCategory, onAddSuccessMessageCategory, onChangeEditingCategory, onChangeFilterCategory, onCleanCategories, 
    onSetActiveCategory, onStartFilterCategories, onStartGetCategories, onStartUploadFile, onStartUploadNewCategory, onChangeFilteringCategory, 
    onSetNumberCategories, onStartNumberCategories, onChangePreCategoryName, onChangePreCategoryUpdated, onStartUpdateCategory, 
    onStartChangeActiveCategory, onChangeActiveCategory, onChangePageAndSizeCategory } from "../store";

export const useCategoriesStore = () => {
    const dispatch = useDispatch();

    const { 
        activeCategory,
        categories,
        editing,
        filter,
        filtering,
        isSaving,
        isLoading,
        message,
        numberCategories,
    } = useSelector( state => state.categories );
    
    //*Slice
    const addNewCategory = () => {
        dispatch( onAddNewCategory() );
    }

    const setActiveCategory = ( category ) => {
        dispatch( onSetActiveCategory( category ) );
    }

    const addImageCategory = ( images ) => {
        dispatch( onAddImageCategory( images ) );
    }

    const addIconCategory = ( images ) => {
        dispatch( onAddIconCategory( images ) );
    }

    const addErrorMessageCategory = ( message ) => {
        dispatch( onAddErrorMessageCategory( message ) );
    }

    const addSuccessMessageCategory = ( message ) => {
        dispatch( onAddSuccessMessageCategory( message ) );
    }

    const setNumberCategories = ( number ) => {
        dispatch( onSetNumberCategories( number ) );
    }

    const changeEditingCategory = ( value ) => {
        dispatch( onChangeEditingCategory( value ) );
    }

    const changePreCategoryName = ( value ) => {
        dispatch( onChangePreCategoryName( value ) );
    }

    const changePreCategoryUpdated = ( value ) => {
        dispatch( onChangePreCategoryUpdated( value ) );
    }

    const changeFilteringCategory = ( value ) => {
        dispatch( onChangeFilteringCategory( value ) );
    }

    const changeFilterCategory = ( value ) => {
        dispatch( onChangeFilterCategory( value ) );
    }

    const changeActiveCategory = () => {
        dispatch( onChangeActiveCategory() );
    }

    const changePageAndSizeCategory = ( value ) => {
        dispatch( onChangePageAndSizeCategory( value ) );
    }

    const cleanCategories = () => {
        dispatch( onCleanCategories() );
    }
    

    //*Thunks
    const startUploadFile = ( file, type, collectionName ) => {
        dispatch( onStartUploadFile( file, type, collectionName ) )
    }

    const startUploadNewCategory = () => {
        dispatch( onStartUploadNewCategory() );
    }

    const startGetCategories = (page, size) => {
        dispatch( onStartGetCategories(page, size) );
    }

    const startNumberCategories = () => {
        dispatch( onStartNumberCategories() );
    }

    const startFilterCategories = (page, size, preValue) => {
        dispatch( onStartFilterCategories(page, size, preValue) );
    }

    const startUpdateCategory = () => {
        dispatch( onStartUpdateCategory() );
    }

    const startChangeActiveCategory = () => {
        dispatch( onStartChangeActiveCategory() );
    }    

    return {
        //*Propiedades
        activeCategory,
        categories,
        editing,
        filter,
        isLoading,
        filtering,
        isSaving,
        message,
        numberCategories,

        //*Métodos
        addErrorMessageCategory,
        addIconCategory,
        addImageCategory,
        addNewCategory,
        addSuccessMessageCategory,
        changeActiveCategory,
        changeEditingCategory,
        changeFilterCategory,
        changeFilteringCategory,
        changePageAndSizeCategory,
        changePreCategoryName,
        changePreCategoryUpdated,
        cleanCategories,
        setActiveCategory,
        setNumberCategories,
        startFilterCategories,
        startGetCategories,
        startNumberCategories,
        startUploadFile,
        startUploadNewCategory,
        startUpdateCategory,
        startChangeActiveCategory,
    }
}