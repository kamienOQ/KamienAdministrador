import { useDispatch, useSelector } from "react-redux";
import { onAddErrorMessage, onAddIcon, onAddImage, onAddNewCategory, onAddProducts, onAddSuccessMessage, onCleanCategories, 
    onSetActiveCategory, onStarGetProductsUploaded, onStartGetCategories, onStartGetCategoriesByName, onStartUploadFile, onStartUploadNewCategory } from "../store";

export const useCategoriesStore = () => {
    const dispatch = useDispatch();

    //*Slice
    const { 
        isSaving,
        message,
        productsUploaded,
        numberCategories,
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
        dispatch( onAddImage( images ) );
    }

    const addIcon = ( images ) => {
        dispatch( onAddIcon( images ) );
    }

    const addProducts = ( products ) => {
        dispatch( onAddProducts( products ) );
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

    const starGetProductsUploaded = () => {
        dispatch( onStarGetProductsUploaded() );
    }

    const startGetCategories = ( page = 1 ) => {
        dispatch( onStartGetCategories( page ) );
    }

    const startGetCategoriesByName = ( name, page = 1 ) => {
        dispatch( onStartGetCategoriesByName( name ) );
    }
    
    

    return {
        //*Propiedades
        message,
        isSaving,
        productsUploaded,
        numberCategories,
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
        startGetCategories,
        startGetCategoriesByName,

    }
}
