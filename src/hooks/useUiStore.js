import { useDispatch, useSelector } from 'react-redux';
// Product
import { onCleanActiveProduct, onRestorePage } from '../store';
// Ui
import { onChangePage, onCloseProductModal, onDownPage, 
    onOpenProductModal, onUpPage } from '../store';

export const useUiStore = () => {

    const dispatch = useDispatch();

    const { 
        isProductModalOpen,
        totalPages,
        page
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

    const openProductModal = () => {
        dispatch( onOpenProductModal() );
    }

    const closeProductModal = () => {
        dispatch( onCloseProductModal() );
        dispatch( onCleanActiveProduct() );
    }



    return {
        //*Propiedades
        isProductModalOpen,
        totalPages,
        page,

        //*Métodos
        upPage,
        downPage,
        changePage,
        restorePage,
        openProductModal,
        closeProductModal,
    }

}