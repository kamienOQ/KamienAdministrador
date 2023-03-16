import { useDispatch, useSelector } from "react-redux";
import { onAddErrorMessage1, onAddIcon1, onAddImage1, onAddNewCategory, onAddSuccessMessage1, onChangeAscending1, onCleanCategories, 
    onSetActiveCategory, onStartGetCategories, onStartUploadFile1, onStartUploadNewCategory } from "../store";

export const useCategoriesStore = () => {
    const dispatch = useDispatch();

    const { 
        activeCategory,
        ascending,
        categories,
        categoriesOnPage,
        isSaving,
        message,
        numberCategories,
        productsUploaded,
    } = useSelector( state => state.categories );
    
    //*Slice
    const addNewCategory = () => {
        dispatch( onAddNewCategory() );
    }

    const setActiveCategory = ( category ) => {
        dispatch( onSetActiveCategory( category ) );
    }

    const changeAscending1 = ( value ) => {
        dispatch( onChangeAscending1( value ) );
    }

    const addImage1 = ( images ) => {
        dispatch( onAddImage1( images ) );
    }

    const addIcon1 = ( images ) => {
        dispatch( onAddIcon1( images ) );
    }

    const addErrorMessage1 = ( message ) => {
        dispatch( onAddErrorMessage1( message ) );
    }

    const addSuccessMessage1 = ( message ) => {
        dispatch( onAddSuccessMessage1( message ) );
    }

    const cleanCategories = () => {
        dispatch( onCleanCategories() );
    }
    

    //*Thunks
    const startUploadFile1 = ( file, type, collectionName ) => {
        dispatch( onStartUploadFile1( file, type, collectionName ) )
    }

    const startUploadNewCategory = () => {
        dispatch( onStartUploadNewCategory() );
    }

    const startGetCategories = () => {
        dispatch( onStartGetCategories() );
    }    

    return {
        //*Propiedades
        activeCategory,
        ascending,
        categories,
        categoriesOnPage,
        isSaving,
        message,
        numberCategories,
        productsUploaded,

        //*Métodos
        addErrorMessage1,
        addIcon1,
        addImage1,
        addNewCategory,
        addSuccessMessage1,
        changeAscending1,
        cleanCategories,
        setActiveCategory,
        startGetCategories,
        startUploadFile1,
        startUploadNewCategory,
    }
}
