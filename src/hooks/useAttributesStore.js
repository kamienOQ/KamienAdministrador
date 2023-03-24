import { useDispatch, useSelector } from "react-redux";
import { onAddErrorMessage, onAddIcon, onAddImage, onAddNewAttribute, onAddSuccessMessage, onChangeAscending, onCleanAttributes, 
    onSetActiveAttribute, onStartGetAttributes, onStartUploadFile, onstartUploadNewAttribute } from "../store";

export const useAttributesStore = () => {
    const dispatch = useDispatch();

    const { 
        activeAttribute,
        ascending,
        attributes,
        attributesOnPage,
        isSaving,
        message,
        numberAttributes,
        productsUploaded,
    } = useSelector( state => state.attributes );
    
    //*Slice
    const addNewAttribute = () => {
        dispatch( onAddNewAttribute() );
    }

    const setActiveAttribute = ( attribute ) => {
        dispatch( onSetActiveAttribute( attribute ) );
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

    const cleanAttributes = () => {
        dispatch( onCleanAttributes() );
    }
    

    //*Thunks
    const startUploadFile = ( file, type, collectionName ) => {
        dispatch( onStartUploadFile( file, type, collectionName ) )
    }

    const startUploadNewAttribute = () => {
        dispatch( onstartUploadNewAttribute() );
    }

    const startGetAttributes = () => {
        dispatch( onStartGetAttributes() );
    }    

    return {
        //*Propiedades
        activeAttribute,
        ascending,
        attributes,
        attributesOnPage,
        isSaving,
        message,
        numberAttributes,
        productsUploaded,

        //*Métodos
        addErrorMessage,
        addIcon,
        addImage,
        addNewAttribute,
        addSuccessMessage,
        changeAscending,
        cleanAttributes,
        setActiveAttribute,
        startGetAttributes,
        startUploadFile,
        startUploadNewAttribute,
    }
}
