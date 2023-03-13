import { useDispatch, useSelector } from "react-redux";
import { onAddErrorMessage, onAddNewAttribute, onAddCategories, onAddSuccessMessage, onCleanAttributes, 
    onSetActiveAttribute, onStarGetCategoriesUploaded, onStartUploadFile, onStartUploadNewAttribute } from "../store";




    
export const useAttributesStore = () => {
    const dispatch = useDispatch();

    //*Slice
    const { 
        isSaving,
        message,
        categoriesUploaded,
        attributes,
        activeAttribute
    } = useSelector( state => state.attributes );

    const addNewAttribute = () => {
        dispatch( onAddNewAttribute() );
    }

    const setActiveAttribute = ( attribute ) => {
        dispatch( onSetActiveAttribute( attribute ) );
    }

    const addCategories = ( categories ) => {
        dispatch( onAddCategories( categories ) );
    }

    const addErrorMessage = ( message ) => {
        dispatch( onAddErrorMessage( message ) );
    }

    const addSuccessMessage = ( message ) => {
        dispatch( onAddSuccessMessage( message ) );
    }

    const cleanAttributes = () => {
        dispatch( onCleanAttributes() );
    }
    

    //*Thunks

    const startUploadFile = ( file, type, collectionName ) => {
        dispatch( onStartUploadFile( file, type, collectionName ) )
    }

    const startUploadNewAttribute = () => {
        dispatch(onStartUploadNewAttribute() );
    }

    const starGetCategoriesUploaded = () => {
        dispatch( onStarGetCategoriesUploaded() );
    }

    return {
        //*Propiedades
        message,
        isSaving,
        categoriesUploaded,
        attributes,
        activeAttribute,

        //*Métodos
        addNewAttribute,
        setActiveAttribute,
        addCategories,
        addErrorMessage,
        addSuccessMessage,
        cleanAttributes,
        startUploadFile,
        startUploadNewAttribute,
        starGetCategoriesUploaded,

    }
}