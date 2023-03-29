import { useDispatch, useSelector } from "react-redux";
import { onAddErrorMessage, onAddIcon, onAddImage, onAddNewProduct, onAddProducts, onAddSuccessMessage, onChangeAscending, onCleanProducts, 
    onSetActiveProduct, onStartGetProducts, onStartUploadFile, onStartUploadNewProduct, onChangeEditing, 
    onStartFilterProducts, onSetNumberProducts, onStartNumberProducts, onChangePreProductName, onChangePreProductUpdated, 
    onStartUpdateProduct, onStartChangeActiveProduct, onChangeActive, onChangePageAndSize, onChangeFilterings, onChangeFilters } from "../store";

export const useProductsStore = () => {
    const dispatch = useDispatch();

    const { 
        activeProduct,
        products,
        editing,
        filter,
        filtering,
        isSaving,
        isLoadingProduct,
        message,
        numberProducts,
    } = useSelector( state => state.products );

    //*Slice
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

    const setNumberProducts = ( number ) => {
        dispatch( onSetNumberProducts( number ) );
    }

    const changeEditing = ( value ) => {
        dispatch( onChangeEditing( value ) );
    }

    const changePreProductName = ( value ) => {
        dispatch( onChangePreProductName( value ) );
    }

    const changePreProductUpdated = ( value ) => {
        dispatch( onChangePreProductUpdated( value ) );
    }

    const changeFiltering = ( value ) => {
        dispatch( onChangeFilterings( value ) );
    }

    const changeFilter = ( value ) => {
        dispatch( onChangeFilters( value ) );
    }

    const changeActive = () => {
        dispatch( onChangeActive() );
    }

    const changePageAndSize = ( value ) => {
        dispatch( onChangePageAndSize( value ) );
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

    const startGetProducts = ( page, size ) => {
        dispatch( onStartGetProducts( page, size ) );
    }

    const startNumberProducts = () => {
        dispatch( onStartNumberProducts() );
    }

    const startFilterProducts = (page, size, preValue) => {
        dispatch( onStartFilterProducts(page, size, preValue) );
    }

    const startUpdateProduct     = () => {
        dispatch( onStartUpdateProduct  () );
    }

    const startChangeActiveProduct   = () => {
        dispatch( onStartChangeActiveProduct    () );
    }       

    return {
        //*Propiedades
        activeProduct,
        products,
        editing,
        filter,
        isLoadingProduct,
        filtering,
        isSaving,
        message,
        numberProducts,

        //*Métodos
        addErrorMessage,
        addIcon,
        addImage,
        addNewProduct,
        addProducts, 
        addSuccessMessage,
        changeActive,
        changeEditing,
        changeFilter,
        changeFiltering,
        changePageAndSize,
        changePreProductName,
        changePreProductUpdated,
        cleanProducts,
        setActiveProduct,
        setNumberProducts,
        startChangeActiveProduct,
        startFilterProducts,
        startGetProducts,
        startNumberProducts,
        startUpdateProduct,
        startUploadFile,
        startUploadNewProduct,
    }
}
