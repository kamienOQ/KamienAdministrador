import { useDispatch, useSelector } from 'react-redux';
// Ui
import {onCloseModalView, onOpenModalView,onOpenCategoryModal, onCloseCategoryModal,onAddCategoriesSelected, onDeleteAttributesSelected, onSetCategoriesSelected} from '../store/ui/uiAttSlice';

import {onCleanActiveCategory,} from '../store/attributes/attibutesSlice'


export const useAttUiStore = () => {

    const dispatch = useDispatch();

    const { 
        isCategoryModalOpen,
        isModalViewOpen,
        categoriesSelected,
        examplesSelected,
    } = useSelector( state => state.ui );

    const openCategoryModal = () => {
        dispatch( onOpenCategoryModal() );
    }

    const closeCategoryModal = () => {
        dispatch( onCloseCategoryModal() );
        dispatch( onCleanActiveCategory() );
    }

    const openModalView = () => {
        dispatch( onOpenModalView() );
    }

    const closeModalView = () => {
        dispatch( onCloseModalView() );
    }

    const addCategoriesSelected = ( categoriesSelected ) => {
        dispatch( onAddCategoriesSelected( categoriesSelected ) )
    }

    const deleteAttributesSelected = ( categoriesSelected ) => {
        dispatch( onDeleteAttributesSelected( categoriesSelected ) )
    }

    const setCategoriesSelected = ( categoriesSelected ) => {
        dispatch( onSetCategoriesSelected( categoriesSelected ) )
    }

    /******onAddCategoriesSelected****/
    const addExamplesSelected = ( examplesSelected ) => {
        dispatch( onAddExamplesSelected( examplesSelected ) )
    }

    /****onDeleteAttributesSelected****/
    const deleteExamplesSelected = ( examplesSelected ) => {
        dispatch( onDeleteExamplesSelected( examplesSelected ) )
    }
    /***onSetCategoriesSelected*******/ 
    const setExamplesSelected = ( examplesSelected ) => {
        dispatch( onSetExamplesSelected( examplesSelected ) )
    }


    

    return {
        //*Propiedades
        isCategoryModalOpen,
        isModalViewOpen,
        categoriesSelected,
        examplesSelected,

        //*Métodos
        addCategoriesSelected,
        openCategoryModal,
        closeCategoryModal,
        openModalView,
        closeModalView,
        deleteAttributesSelected,
        setCategoriesSelected,
        addExamplesSelected,
        deleteExamplesSelected,
        setExamplesSelected,
    }

}