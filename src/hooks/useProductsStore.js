import { useDispatch, useSelector } from "react-redux";
import { onAddErrorMessage, onAddIcon, onAddImage, onAddNewProduct, onAddProducts, onAddSuccessMessage, onCleanProducts, 
    onSetActiveProduct, onStarGetProductsUploaded, onStartGetProducts, onStartUploadFile, onStartUploadNewProduct } from "../store";

export const useProductsStore = () => {
    const dispatch = useDispatch();

    //*Slice
    const { 
        isSaving,
        message,
        productsUploaded,
        products,
        activeProduct
    } = useSelector( state => state.products );

    const addNewProduct = () => {
        dispatch( onAddNewProduct() );
    }

    const setActiveProduct = ( product ) => {
        dispatch( onSetActiveProduct( product ) );
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

    const startGetProducts = ( page = 1 ) => {
        dispatch( onStartGetProducts( page ) );
    }

    const startGetProductsByName = ( name, page = 1 ) => {
        dispatch( onStartGetProductsByName( name, page ) );
    }

    return {
        //*Propiedades
        message,
        isSaving,
        productsUploaded,
        products,
        activeProduct,

        //*Métodos
        addNewProduct,
        setActiveProduct,
        addImage,
        addIcon,
        addProducts,
        addErrorMessage,
        addSuccessMessage,
        cleanProducts,
        startUploadFile,
        startUploadNewProduct,
        starGetProductsUploaded,
        startGetProducts,
        startGetProductsByName,
    }
}
