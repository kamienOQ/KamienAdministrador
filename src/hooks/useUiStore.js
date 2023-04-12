import { useDispatch, useSelector } from 'react-redux';
//Categories
import { onCleanActiveCategory, onCloseModalView, onOpenModalView } from '../store';
// Ui
import { onCloseCategoryModal, onOpenCategoryModal} from '../store';
//Kategories
import { onCleanActiveAttribute, onRestorePage } from '../store';
// Ui
import { onChangePage, onCloseAttributeModal, onDownPage, 
    onOpenAttributeModal, onUpPage} from '../store';

export const useUiStore = () => {

    const dispatch = useDispatch();

    const { 
        isCategoryModalOpen,
        isModalViewOpen,
        isAttributeModalOpen,
        totalPages,
        page
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

    const upPage = () => {
        dispatch( onUpPage() );
    }
    const downPage = () => {
        dispatch( onDownPage() );
    }

    const changePage = ( total ) => {
        dispatch( onChangePage( total ) );
    }

    const restorePage = () => {
        dispatch( onRestorePage() );
    }

    const openAttributeModal = () => {
        dispatch( onOpenAttributeModal() );
    }

    const closeAttributeModal = () => {
        dispatch( onCloseAttributeModal() );
        dispatch( onCleanActiveAttribute() );
    }

    

    return {
        //*Propiedades
        isCategoryModalOpen,
        isModalViewOpen,
        isAttributeModalOpen,
        totalPages,
        page,

        //*Métodos
        openCategoryModal,
        closeCategoryModal,
        openModalView,
        closeModalView,


        //*Métodos
        upPage,
        downPage,
        changePage,
        restorePage,
        openAttributeModal,
        closeAttributeModal,
    }

}
}