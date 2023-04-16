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
        console.log(categoriesSelected);
        dispatch( onSetCategoriesSelected( categoriesSelected ) )
    }

    return {
        //*Propiedades
        isCategoryModalOpen,
        isModalViewOpen,
        categoriesSelected,

        //*Métodos
        addCategoriesSelected,
        openCategoryModal,
        closeCategoryModal,
        openModalView,
        closeModalView,
        deleteAttributesSelected,
        setCategoriesSelected,
    }

}