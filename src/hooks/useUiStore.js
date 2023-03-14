import { useDispatch, useSelector } from 'react-redux'
import { onAddProductsSelected, onCleanProductsSelected, onCloseProductModal, onDeleteProductsSelected, onOpenProductModal } from '../store/ui/uiSlice'

export const useUiStore = () => {

    const dispatch = useDispatch()

    const { 
        isProductModalOpen,
        productsSelected
    } = useSelector( state => state.ui );

    const openProductModal = () => {
        dispatch( onOpenProductModal() )
    }

    const closeProductModal = () => {
        dispatch( onCloseProductModal() )
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