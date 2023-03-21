import { useDispatch, useSelector } from "react-redux";
import { onAddErrorMessage, onAddIcon, onAddImage, onAddNewCategory, onAddSuccessMessage, onCleanCategories, 
    onSetActiveCategory, onStartGetCategories, onStartUploadFile, onStartUploadNewCategory } from "../store";

export const useCategoriesStore = () => {
    const dispatch = useDispatch();

    const { 
        activeCategory,
        categories,
        categoriesOnPage,
        isSaving,
        message,
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

    return {
        //*Propiedades
        activeCategory,
        categories,
        categoriesOnPage,
        isSaving,
        message,
        productsUploaded,

        //*Métodos
        addErrorMessage,
        addIcon,
        addImage,
        addNewCategory,
        addSuccessMessage,
        cleanCategories,
        setActiveCategory,
        startGetCategories,
        startUploadFile,
        startUploadNewCategory,
    }
}
