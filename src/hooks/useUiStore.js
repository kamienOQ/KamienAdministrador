import { useDispatch, useSelector } from 'react-redux'
import { onAddProductsSelected, onCleanProductsSelected, onCloseAttributeModal, onDeleteProductsSelected, onOpenAttributeModal } from '../store/ui/uiSlice'

export const useUiStore = () => {

    const dispatch = useDispatch()

    const { 
        isAttributeModalOpen,
        productsSelected
    } = useSelector( state => state.ui )

    const openAttributeModal = () => {
        dispatch( onOpenAttributeModal() )
    }

    const closeAttributeModal = () => {
        dispatch( onCloseAttributeModal() )
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
        isAttributeModalOpen,
        productsSelected,

        //*Métodos
        openAttributeModal,
        closeAttributeModal,
        addProductsSelected,
        deleteProductsSelected,
        cleanProductsSelected
    }

}