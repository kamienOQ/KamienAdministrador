import { useDispatch, useSelector } from "react-redux";
import { onAddErrorMessage, onAddIcon, onAddImage, onAddNewCategory, onAddProducts, onAddSuccessMessage, OnCleanCategories, 
    onSetActiveCategory, onStartUploadFile, onStartUploadNewCategory } from "../store";

export const useCategoriesStore = () => {
    const dispatch = useDispatch();

    //*Slice
    const { 
        isSaving,
        message,
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
        dispatch( OnCleanCategories() );
    }
    

    //*Thunks

    const startUploadFile = ( file, type, collectionName ) => {
        dispatch( onStartUploadFile( file, type, collectionName ) )
    }

    const startUploadNewCategory = () => {
        dispatch( onStartUploadNewCategory() );
    }

    return {
        //*Propiedades
        message,
        isSaving,
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

    }
}
