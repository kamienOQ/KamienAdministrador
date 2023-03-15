import { useDispatch, useSelector } from 'react-redux'
import { onCleanProducts, onCleanProductUploaded } from '../store';
import { onAddProductsSelected, onCleanProductsSelected, onCloseProductModal, onDeleteProductsSelected, onOpenProductModal } from '../store/ui/uiSlice'

export const useUiStore = () => {

    const dispatch = useDispatch();

    const { 
        isProductModalOpen,
        productsSelected
    } = useSelector( state => state.ui );

    const openProductModal = () => {
        dispatch( onOpenProductModal() );
    }

    const closeProductModal = () => {
        dispatch( onCloseProductModal() );
        dispatch( onCleanProducts() );
        dispatch( onCleanProductsSelected() );
        dispatch( onCleanProductUploaded() );
    }

    const addProductsSelected = ( productSelected ) => {
        dispatch( onAddProductsSelected( productSelected ) );
    }

    const deleteProductsSelected = ( productSelected ) => {
        dispatch( onDeleteProductsSelected( productSelected ) );
    }

    const cleanProductsSelected = () => {
        dispatch( onCleanProductsSelected() )
    }
    

    return {
        //*Propiedades
        isProductModalOpen,
        productsSelected,

        //*Métodos
        openProductModal,
        closeProductModal,
        addProductsSelected,
        deleteProductsSelected,
        cleanProductsSelected
    }

}