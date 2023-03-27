import { useDispatch, useSelector } from "react-redux";
import { onAddErrorMessage, onAddIcon, onAddImage, onAddNewCategory, onAddSuccessMessage, onChangeEditing, onChangeFilter, onCleanCategories, 
    onSetActiveCategory, onStartFilterCategories, onStartGetCategories, onStartUploadFile, onStartUploadNewCategory, onChangeFiltering, onSetNumberCategories, onStartNumberCategories, onChangePageSize, onChangePreCategoryName, onChangePreCategoryUpdated, onStartUpdateCategory, onStartChangeActiveCategory, onChangeActive } from "../store";

export const useCategoriesStore = () => {
    const dispatch = useDispatch();

    const { 
        activeCategory,
        categories,
        editing,
        filter,
        filtering,
        isSaving,
        isLoading,
        message,
        numberCategories,
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

    const  setNumberCategories = ( number ) => {
        dispatch(  onSetNumberCategories( number ) );
    }

    const changeEditing = ( value ) => {
        dispatch( onChangeEditing( value ) );
    }

    const changePreCategoryName = ( value ) => {
        dispatch( onChangePreCategoryName( value ) );
    }

    const changePreCategoryUpdated = ( value ) => {
        dispatch( onChangePreCategoryUpdated( value ) );
    }

    const changeFiltering = ( value ) => {
        dispatch( onChangeFiltering( value ) );
    }

    const changeFilter = ( value ) => {
        dispatch( onChangeFilter( value ) );
    }

    const changeActive = () => {
        dispatch( onChangeActive() );
    }

    const changePageSize = ( pageSize ) => {
        dispatch( onChangePageSize( pageSize ) );
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

    const startGetCategories = (page, size) => {
        dispatch( onStartGetCategories(page, size) );
    }

    const startNumberCategories = () => {
        dispatch( onStartNumberCategories() );
    }

    const startFilterCategories = (page, size, preValue) => {
        dispatch( onStartFilterCategories(page, size, preValue) );
    }

    const startUpdateCategory = () => {
        dispatch( onStartUpdateCategory() );
    }

    const startChangeActiveCategory = () => {
        dispatch( onStartChangeActiveCategory() );
    }    

    return {
        //*Propiedades
        activeCategory,
        categories,
        editing,
        filter,
        isLoading,
        filtering,
        isSaving,
        message,
        numberCategories,

        //*Métodos
        addErrorMessage,
        addIcon,
        addImage,
        addNewCategory,
        addSuccessMessage,
        changeActive,
        changeEditing,
        changeFilter,
        changeFiltering,
        changePageSize,
        changePreCategoryName,
        changePreCategoryUpdated,
        cleanCategories,
        setActiveCategory,
        setNumberCategories,
        startFilterCategories,
        startGetCategories,
        startNumberCategories,
        startUploadFile,
        startUploadNewCategory,
        startUpdateCategory,
        startChangeActiveCategory,
    }
}
