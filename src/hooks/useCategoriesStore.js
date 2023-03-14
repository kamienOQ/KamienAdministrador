import { useDispatch, useSelector } from "react-redux";
import { onAddErrorMessage1, onAddIcon1, onAddImage1, onAddNewCategory, onAddProducts1, onAddSuccessMessage1, onCleanCategories, 
    onSetActiveCategory, onStarGetProductsUploaded1, onStartUploadFile1, onStartUploadNewCategory } from "../store";

export const useCategoriesStore = () => {
    const dispatch = useDispatch();

    //*Slice
    const { 
        isSaving,
        message,
        productsUploaded,
        categories,
        activeCategory
    } = useSelector( state => state.categories );

    const addNewCategory = () => {
        dispatch( onAddNewCategory() );
    }

    const setActiveCategory = ( category ) => {
        dispatch( onSetActiveCategory( category ) );
    }

    const addImage = ( images ) => {
        dispatch( onAddImage1( images ) );
    }

    const addIcon = ( images ) => {
        dispatch( onAddIcon1( images ) );
    }

    const addProducts = ( products ) => {
        dispatch( onAddProducts1( products ) );
    }

    const addErrorMessage = ( message ) => {
        dispatch( onAddErrorMessage1( message ) );
    }

    const addSuccessMessage = ( message ) => {
        dispatch( onAddSuccessMessage1( message ) );
    }

    const cleanCategories = () => {
        dispatch( onCleanCategories() );
    }
    

    //*Thunks

    const startUploadFile = ( file, type, collectionName ) => {
        dispatch( onStartUploadFile1( file, type, collectionName ) )
    }

    const startUploadNewCategory = () => {
        dispatch( onStartUploadNewCategory() );
    }

    const starGetProductsUploaded = () => {
        dispatch( onStarGetProductsUploaded1() );
    }

    return {
        //*Propiedades
        message,
        isSaving,
        productsUploaded,
        categories,
        activeCategory,

        //*Métodos
        addNewCategory,
        setActiveCategory,
        addImage,
        addIcon,
        addProducts,
        addErrorMessage,
        addSuccessMessage,
        cleanCategories,
        startUploadFile,
        startUploadNewCategory,
        starGetProductsUploaded,

    }
}
