import { useDispatch, useSelector } from "react-redux";
import { onAddErrorMessage, onAddIcon, onAddImage, onAddNewProduct, onAddProducts, onAddSuccessMessage, onChangeAscending, onCleanProducts, 
    onSetActiveProduct, onStarGetProductsUploaded, onStartGetProducts, onStartUploadFile, onStartUploadNewProduct } from "../store";

export const useProductsStore = () => {
    const dispatch = useDispatch();

    const { 
        activeProduct,
        ascending,
        products,
        productsOnPage,
        isSaving,
        message,
        numberProducts,
        productsUploaded,
    } = useSelector( state => state.products );

    //*Slice
    const addNewProduct = () => {
        dispatch( onAddNewProduct() );
    }

    const setActiveProduct = ( product ) => {
        dispatch( onSetActiveProduct( product ) );
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

    const addProducts = ( products ) => {
        dispatch( onAddProducts( products ) );
    }

    const addErrorMessage = ( message ) => {
        dispatch( onAddErrorMessage( message ) );
    }   

    const addSuccessMessage = ( message ) => {
        dispatch( onAddSuccessMessage( message ) );
    }

    const cleanProducts = () => {
        dispatch( onCleanProducts() );
    }
    

    //*Thunks

    const startUploadFile = ( file, type, collectionName ) => {
        dispatch( onStartUploadFile( file, type, collectionName ) )
    }

    const startUploadNewProduct = () => {
        dispatch( onStartUploadNewProduct() );
    }

    const starGetProductsUploaded = () => {
        dispatch( onStarGetProductsUploaded() );
    }

    const startGetProducts = ( ) => {
        dispatch( onStartGetProducts( ) );
    }

    return {
        //*Propiedades
        activeProduct,
        ascending,
        products,
        productsOnPage,
        isSaving,
        message,
        numberProducts,
        productsUploaded,

        //*Métodos
        addErrorMessage,
        addIcon,
        addProducts,
        addImage,
        addNewProduct,
        addSuccessMessage,
        changeAscending,
        cleanProducts,
        setActiveProduct,
        startGetProducts,
        startUploadFile,
        startUploadNewProduct,
        starGetProductsUploaded,
    }
}
