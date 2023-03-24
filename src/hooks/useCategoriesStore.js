import { useDispatch, useSelector } from "react-redux";
import { onAddErrorMessage, onAddIcon, onAddImage, onAddNewCategory, onAddSuccessMessage, onChangeEditing, onChangeFilter, onCleanCategories, 
    onSetActiveCategory, onStartFilterCategories, onStartGetCategories, onStartUploadFile, onStartUploadNewCategory, onChangeFiltering } from "../store";

export const useCategoriesStore = () => {
    const dispatch = useDispatch();

    const { 
        activeCategory,
        categories,
        categoriesOnPage,
        isSaving,
        message,
        editing,
        filtering,
        filter,
        productsUploaded,
    } = useSelector( state => state.categories );
    
    //*Slice
    const addNewCategory = () => {
        dispatch( onAddNewCategory() );
    }

    const setActiveCategory = ( category ) => {
        dispatch( onSetActiveCategory( category ) );
    }

    const addImage = ( images ) => {
        dispatch( onAddImage( images ) );
    }

    const addIcon = ( images ) => {
        dispatch( onAddIcon( images ) );
    }

    const addErrorMessage = ( message ) => {
        dispatch( onAddErrorMessage( message ) );
    }

    const addSuccessMessage = ( message ) => {
        dispatch( onAddSuccessMessage( message ) );
    }

    const changeEditing = ( value ) => {
        dispatch( onChangeEditing( value ) );
    }

    const changeFiltering = ( value ) => {
        dispatch( onChangeFiltering( value ) );
    }

    const changeFilter = ( value ) => {
        dispatch( onChangeFilter( value ) );
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

    const startGetCategories = () => {
        dispatch( onStartGetCategories() );
    }

    const startFilterCategories = () => {
        dispatch( onStartFilterCategories() );
    }    

    return {
        //*Propiedades
        activeCategory,
        categories,
        categoriesOnPage,
        isSaving,
        message,
        editing,
        filtering,
        filter,
        productsUploaded,

        //*Métodos
        addErrorMessage,
        addIcon,
        addImage,
        addNewCategory,
        addSuccessMessage,
        changeEditing,
        changeFiltering,
        changeFilter,
        cleanCategories,
        setActiveCategory,
        startGetCategories,
        startUploadFile,
        startUploadNewCategory,
        startFilterCategories,
    }
}
