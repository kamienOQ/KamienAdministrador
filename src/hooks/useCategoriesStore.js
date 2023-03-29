import { useDispatch, useSelector } from "react-redux";
import { onAddErrorMessage1, onAddIcon1, onAddImage1, onAddNewCategory, onAddSuccessMessage1, onChangeEditing1, onChangeFilter1, onCleanCategories, 
    onSetActiveCategory, onStartFilterCategories, onStartGetCategories, onStartUploadFile, onStartUploadNewCategory, onChangeFiltering1, 
    onSetNumberCategories, onStartNumberCategories, onChangePreCategoryName, onChangePreCategoryUpdated, onStartUpdateCategory, 
    onStartChangeActiveCategory, onChangeActive1, onChangePageAndSize1 } from "../store";

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

    const addImage1 = ( images ) => {
        dispatch( onAddImage1( images ) );
    }

    const addIcon1 = ( images ) => {
        dispatch( onAddIcon1( images ) );
    }

    const addErrorMessage1 = ( message ) => {
        dispatch( onAddErrorMessage1( message ) );
    }

    const addSuccessMessage1 = ( message ) => {
        dispatch( onAddSuccessMessage1( message ) );
    }

    const  setNumberCategories = ( number ) => {
        dispatch(  onSetNumberCategories( number ) );
    }

    const changeEditing1 = ( value ) => {
        dispatch( onChangeEditing1( value ) );
    }

    const changePreCategoryName = ( value ) => {
        dispatch( onChangePreCategoryName( value ) );
    }

    const changePreCategoryUpdated = ( value ) => {
        dispatch( onChangePreCategoryUpdated( value ) );
    }

    const changeFiltering1 = ( value ) => {
        dispatch( onChangeFiltering1( value ) );
    }

    const changeFilter1 = ( value ) => {
        dispatch( onChangeFilter1( value ) );
    }

    const changeActive1 = () => {
        dispatch( onChangeActive1() );
    }

    const changePageAndSize1 = ( value ) => {
        dispatch( onChangePageAndSize1( value ) );
    }

    const cleanCategories = () => {
        dispatch( onCleanCategories() );
    }
    

    //*Thunks
    const startUploadFile1 = ( file, type, collectionName ) => {
        dispatch( onStartUploadFile1( file, type, collectionName ) )
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
        addErrorMessage1,
        addIcon1,
        addImage1,
        addNewCategory,
        addSuccessMessage1,
        changeActive1,
        changeEditing1,
        changeFilter1,
        changeFiltering1,
        changePageAndSize1,
        changePreCategoryName,
        changePreCategoryUpdated,
        cleanCategories,
        setActiveCategory,
        setNumberCategories,
        startFilterCategories,
        startGetCategories,
        startNumberCategories,
        startUploadFile1,
        startUploadNewCategory,
        startUpdateCategory,
        startChangeActiveCategory,
    }
}