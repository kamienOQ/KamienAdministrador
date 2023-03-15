import { useDispatch, useSelector } from 'react-redux';
//Kategories
import { onCleanCategories, onRestorePage } from '../store';
// Ui
import { onChangePage, onCloseCategoryModal, onDownPage, 
    onOpenCategoryModal, onUpPage, onSearchingName} from '../store';

export const useUiStore = () => {

    const dispatch = useDispatch();

    const { 
        isCategoryModalOpen,
        totalPages,
        page,
        searching,
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

    const searchingName = ( search ) => {
        dispatch( onRestorePage() );
        dispatch( onSearchingName( search ) );
    }

    const openCategoryModal = () => {
        dispatch( onOpenCategoryModal() );
    }

    const closeCategoryModal = () => {
        dispatch( onCloseCategoryModal() );
        dispatch( onCleanCategories() );
    }

    

    return {
        //*Propiedades
        isCategoryModalOpen,
        totalPages,
        page,
        searching,

        //*Métodos
        upPage,
        downPage,
        changePage,
        searchingName,
        openCategoryModal,
        closeCategoryModal,
    }

}