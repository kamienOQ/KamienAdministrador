import { useDispatch, useSelector } from 'react-redux';
// Ui
import {onCloseModalView, onOpenModalView,onOpenCategoryModal, onCloseCategoryModal,onAddCategoriesSelected, onDeleteCategoriesSelected, onSetCategoriesSelected, onAddAttributesSelected, onDeleteAttributesSelected, onSetAttributesSelected} from '../store/ui/uiAttSlice';

import {onCleanActiveCategory,} from '../store/attributes/attibutesSlice'


export const useAttUiStore = () => {

    const dispatch = useDispatch();

    const { 
        isCategoryModalOpen,
        isModalViewOpen,
        categoriesSelected,
        attributesSelected,
    } = useSelector( state => state.uiAtt );

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

    const addAttributesSelected = ( attributesSelected ) => {
        dispatch( onAddAttributesSelected( attributesSelected ) )
    }

    const addCategoriesSelected = ( categoriesSelected ) => {
        dispatch( onAddCategoriesSelected( categoriesSelected ) )
    }

    const deleteAtributesSelected = ( attributesSelected ) => {
        dispatch( onDeleteAttributesSelected( attributesSelected ) )
    }

    const deleteCategoriesSelected = ( categoriesSelected ) => {
        dispatch( onDeleteCategoriesSelected( categoriesSelected ) )
    }

    const setCategoriesSelected = ( categoriesSelected ) => {
        dispatch( onSetCategoriesSelected( categoriesSelected ) )
    }

    const setAttributesSelected = ( attributesSelected ) => {
        dispatch( onSetAttributesSelected( attributesSelected ) )
    }

    return {
        //*Propiedades
        isCategoryModalOpen,
        isModalViewOpen,
        attributesSelected,
        categoriesSelected,

        //*Métodos
        addAttributesSelected,
        addCategoriesSelected,
        openCategoryModal,
        closeCategoryModal,
        openModalView,
        closeModalView,
        deleteAtributesSelected,
        deleteCategoriesSelected,
        setAttributesSelected,
        setCategoriesSelected,
    }

}