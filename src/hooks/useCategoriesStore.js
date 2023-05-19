import { useDispatch, useSelector } from "react-redux";
import { onAddErrorMessage, onAddIcon, onAddImage, onAddNewCategory, onAddSuccessMessage, onChangeEditing, onChangeFilter, onCleanCategories, 
    onSetActiveCategory,  onChangeFiltering, onSetNumberCategories,  onChangePreCategoryName, onChangePreCategoryUpdated,  onChangeActive, 
    onChangePageAndSize, onChangeCreateSuccess, onChangeEditSuccess } from "../store/categories/categoriesSlice";
import { onStartFilterCategories, onStartGetCategories, onStartUploadFile, onStartUploadNewCategory, onStartNumberCategories, onStartUpdateCategory, 
    onStartChangeActiveCategory } from "../store/categories/thunks"

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
        createSuccess,
        editSuccess,
        activeSuccess,
        inactiveSuccess,
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

    const addErrorMessageCategory = ( message ) => {
        dispatch( onAddErrorMessage( message ) );
    }

    const addSuccessMessageCategory = ( message ) => {
        dispatch( onAddSuccessMessage( message ) );
    }

    const  setNumberCategories = ( number ) => {
        dispatch(  onSetNumberCategories( number ) );
    }

    const changeEditingCategory = ( value ) => {
        dispatch( onChangeEditing( value ) );
    }

    const changePreCategoryName = ( value ) => {
        dispatch( onChangePreCategoryName( value ) );
    }

    const changePreCategoryUpdated = ( value ) => {
        dispatch( onChangePreCategoryUpdated( value ) );
    }

    const changeFilteringCategory = ( value ) => {
        dispatch( onChangeFiltering( value ) );
    }

    const changeFilterCategory = ( value ) => {
        dispatch( onChangeFilter( value ) );
    }

    const changeActiveCategory = () => {
        dispatch( onChangeActive() );
    }

    const changePageAndSizeCategory = ( value ) => {
        dispatch( onChangePageAndSize( value ) );
    }

    const cleanCategories = () => {
        dispatch( onCleanCategories() );
    }

    const changeCreateSuccess = (value) => {
        dispatch(onChangeCreateSuccess(value));
    };

    const changeEditSuccess = (value) => {
    dispatch(onChangeEditSuccess(value));
    };

    

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
        createSuccess,
        editSuccess,

        //*Métodos
        addErrorMessageCategory,
        addIcon,
        addImage,
        addNewCategory,
        addSuccessMessageCategory,
        changeActiveCategory,
        changeEditingCategory,
        changeFilterCategory,
        changeFilteringCategory,
        changePageAndSizeCategory,
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
        changeCreateSuccess,
        changeEditSuccess,
    }
}