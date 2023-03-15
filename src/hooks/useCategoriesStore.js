import { useDispatch, useSelector } from "react-redux";
import { onAddErrorMessage, onAddIcon, onAddImage, onAddNewCategory, onAddSuccessMessage, onChangeAscending, onCleanCategories, 
    onSetActiveCategory, onStartGetCategories, onStartUploadFile, onStartUploadNewCategory } from "../store";

export const useCategoriesStore = () => {
    const dispatch = useDispatch();

    const { 
        isSaving,
        message,
        productsUploaded,
        ascending,
        numberCategories,
        categories,
        activeCategory
    } = useSelector( state => state.categories );
    
    //*Slice
    const addNewCategory = () => {
        dispatch( onAddNewCategory() );
    }

    const setActiveCategory = ( category ) => {
        dispatch( onSetActiveCategory( category ) );
    }

    const changeAscending = ( value ) => {
        dispatch( onChangeAscending( value ) );
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
        dispatch( onStartGetCategories( page ) );
    }    

    return {
        //*Propiedades
        message,
        isSaving,
        productsUploaded,
        ascending,
        numberCategories,
        categories,
        activeCategory,

        //*Métodos
        addNewCategory,
        setActiveCategory,
        changeAscending,
        addImage,
        addIcon,
        addErrorMessage,
        addSuccessMessage,
        cleanCategories,
        startUploadFile,
        startUploadNewCategory,
        startGetCategories,
    }
}
