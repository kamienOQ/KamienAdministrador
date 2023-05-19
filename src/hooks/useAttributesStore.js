import { useDispatch, useSelector } from "react-redux";
import { onAddErrorMessage, onAddIcon, onAddImage, onAddNewCategory, onAddSuccessMessage, onChangeEditing, onChangeFilter, onCleanAttributes, 
    onSetActiveCategory, onStartFiltersAttributes, onStartGetAttributes, onStartUploadFile, onStartUploadNewAttribute, onChangeFiltering, 
    onSetNumberAttributes, onStartNumberAttributes, onChangePreCategoryName, onChangePreAttributeUpdated, onStartUpdateAttribute, 
    onStartChangeActiveAttribute, onChangeActive, onChangePageAndSize, onStartGetCategoriesForm, onChangeCreateSuccess, onChangeEditSuccess} from "../store/attributes";

export const useAttributesStore = () => {
    const dispatch = useDispatch();

    const { 
        activeAttribute,
        attributes,
        editing,
        filter,
        filtering,
        isSaving,
        isLoading,
        message,
        numberCategories,
        categories,
        createSuccess,
        editSuccess,
    } = useSelector( state => state.attributes );
    
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
        dispatch(  onSetNumberAttributes( number ) );
    }

    const changeEditing = ( value ) => {
        dispatch( onChangeEditing( value ) );
    }

    const changePreCategoryName = ( value ) => {
        dispatch( onChangePreCategoryName( value ) );
    }

    const changePreCategoryUpdated = ( value ) => {
        dispatch( onChangePreAttributeUpdated( value ) );
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

    const changePageAndSize = ( value ) => {
        dispatch( onChangePageAndSize( value ) );
    }

    const cleanCategories = () => {
        dispatch( onCleanAttributes() );
    }

    const changeCreateSuccess = (value) => {
        dispatch(onChangeCreateSuccess(value));
    }

    const changeEditSuccess = (value) => {
    dispatch(onChangeEditSuccess(value));
    }
    

    //*Thunks
    const startUploadFile = ( file, type, collectionName ) => {
        dispatch( onStartUploadFile( file, type, collectionName ) )
    }

    const startUploadNewCategory = () => {
        dispatch( onStartUploadNewAttribute() );
    }

    const startGetAttributes = (page, size) => {
        dispatch( onStartGetAttributes(page, size) );
    }

    const startNumberCategories = () => {
        dispatch( onStartNumberAttributes() );
    }

    const startFilterAttributes = (page, size, preValue) => {
        dispatch( onStartFiltersAttributes(page, size, preValue) );
    }

    const startUpdateCategory = () => {
        dispatch( onStartUpdateAttribute() );
    }

    const startChangeActiveCategory = () => {
        dispatch( onStartChangeActiveAttribute() );
    }  
    
    const starGetCategoriesForm = () => {
        dispatch ( onStartGetCategoriesForm() );
    }

    return {
        //*Propiedades
        activeAttribute,
        attributes,
        editing,
        filter,
        isLoading,
        filtering,
        isSaving,
        message,
        numberCategories,
        categories,
        createSuccess,
        editSuccess,

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
        changePageAndSize,
        changePreCategoryName,
        changePreCategoryUpdated,
        cleanCategories,
        setActiveCategory,
        setNumberCategories,
        startFilterAttributes,
        startGetAttributes,
        startNumberCategories,
        startUploadFile,
        startUploadNewCategory,
        startUpdateCategory,
        startChangeActiveCategory,
        starGetCategoriesForm,
        changeCreateSuccess,
        changeEditSuccess,
    }
}
