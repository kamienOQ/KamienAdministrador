import { useDispatch, useSelector } from 'react-redux';
// Product
import { onAddProductsSelected, onCleanActiveProduct, onRestorePage } from '../store';
// Ui
import { onChangePage, onCloseProductModal, onDownPage, onCleanProductsSelected, onDeleteProductsSelected,
    onOpenProductModal, onUpPage } from '../store';

export const useUiStore = () => {

    const dispatch = useDispatch();

    const { 
        isProductModalOpen,
        productsSelected,
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

    const addProductsSelected = ( productSelected ) => {
        dispatch( onAddProductsSelected( productSelected ) )
    }

    const deleteProductsSelected = ( productSelected ) => {
        dispatch( onDeleteProductsSelected( productSelected ) )
    }

    const openProductModal = () => {
        dispatch( onOpenProductModal() );
    }

    const closeProductModal = () => {
        dispatch( onCloseProductModal() );
        dispatch( onCleanActiveProduct() );
    }

    const cleanProductsSelected = () => {
        dispatch( onCleanProductsSelected() )
    }



    return {
        //*Propiedades
        isProductModalOpen,
        productsSelected,
        totalPages,
        page,

        //*Métodos
        upPage,
        downPage,
        changePage,
        restorePage,
        addProductsSelected,
        deleteProductsSelected,
        cleanProductsSelected,
        openProductModal,
        closeProductModal,
    }

}