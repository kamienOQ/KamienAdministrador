import { useDispatch, useSelector } from 'react-redux';
// Product
import { onCleanActiveProduct, onCloseModalViewProduct, onOpenModalViewProduct } from '../store';
//Categories
import { onCleanActiveCategory } from '../store';
// Ui
import { onAddProductsSelected, onCloseProductModal, onOpenProductModal, onDeleteProductsSelected, onCloseCategoryModal, onOpenCategoryModal } from '../store';

export const useUiStore = () => {

    const dispatch = useDispatch();

    const { 
        isProductModalOpen,
        isCategoryModalOpen,
        productsSelected,
        totalPages,
        page,
        isModalViewOpenProduct, 
    } = useSelector( state => state.ui );

    const openProductModal = () => {
        dispatch( onOpenProductModal() );
    }

    const closeProductModal = () => {
        dispatch( onCloseProductModal() );
        dispatch( onCleanActiveProduct() );
    }

    const openCategoryModal = () => {
        dispatch( onOpenCategoryModal() );
    }

    const closeCategoryModal = () => {
        dispatch( onCloseCategoryModal() );
        dispatch( onCleanActiveCategory() );
    }

    const addProductsSelected = ( productSelected ) => {
        dispatch( onAddProductsSelected( productSelected ) )
    }

    const deleteProductsSelected = ( productSelected ) => {
        dispatch( onDeleteProductsSelected( productSelected ) )
    }

    const cleanProductsSelected = () => {
        dispatch( onCleanProductsSelected() )
    }

    const openModalViewProduct = () => {
        dispatch( onOpenModalViewProduct() )
    }

    const closeModalViewProduct = () => {
        dispatch( onCloseModalViewProduct() )
    }

    return {
        //*Propiedades
        isProductModalOpen,
        isCategoryModalOpen,
        productsSelected,
        isModalViewOpenProduct,

        //*Métodos
        addProductsSelected,
        deleteProductsSelected,
        cleanProductsSelected,
        openProductModal,
        closeProductModal,
        openCategoryModal,
        closeCategoryModal,
        openModalViewProduct,
        closeModalViewProduct
    }

}