import { useDispatch, useSelector } from 'react-redux';
//Categories
import { onCleanActiveCategory } from '../store/categories';
// Ui
import { onCloseCategoryModal, onOpenCategoryModal, onCloseModalView, onOpenModalView } from '../store/ui/uiSlice';

export const useUiStore = () => {

    const dispatch = useDispatch();

    const { 
        isCategoryModalOpen,
        isModalViewOpen,
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

    

    return {
        //*Propiedades
        isCategoryModalOpen,
        isModalViewOpen,

        //*Métodos
        openCategoryModal,
        closeCategoryModal,
        openModalView,
        closeModalView,
    }

}