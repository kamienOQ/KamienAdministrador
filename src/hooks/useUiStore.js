import { useDispatch, useSelector } from 'react-redux';
//Kategories
import { onCleanActiveCategory, onRestorePage } from '../store';
// Ui
import { onChangePage, onCloseCategoryModal, onDownPage, 
    onOpenCategoryModal, onUpPage} from '../store';

export const useUiStore = () => {

    const dispatch = useDispatch();

    const { 
        isCategoryModalOpen,
        totalPages,
        page,
    } = useSelector( state => state.ui );

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

    const openCategoryModal = () => {
        dispatch( onOpenCategoryModal() );
    }

    const closeCategoryModal = () => {
        dispatch( onCloseCategoryModal() );
        dispatch( onCleanActiveCategory() );
    }

    

    return {
        //*Propiedades
        isCategoryModalOpen,
        totalPages,
        page,

        //*Métodos
        upPage,
        downPage,
        changePage,
        restorePage,
        openCategoryModal,
        closeCategoryModal,
    }

}