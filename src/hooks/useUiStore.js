import { useDispatch, useSelector } from 'react-redux'
import { onCleanCategories, onCleanProductsUploaded } from '../store';
import { onAddProductsSelected, onCleanProductsSelected, onCloseCategoryModal, onDeleteProductsSelected, onOpenCategoryModal } from '../store/ui/uiSlice'

export const useUiStore = () => {

    const dispatch = useDispatch();

    const { 
        isCategoryModalOpen,
        productsSelected
    } = useSelector( state => state.ui );

    const openCategoryModal = () => {
        dispatch( onOpenCategoryModal() );
    }

    const closeCategoryModal = () => {
        dispatch( onCloseCategoryModal() );
        dispatch( onCleanCategories() );
        dispatch( onCleanProductsSelected() );
        dispatch( onCleanProductsUploaded() );
    }

    const addProductsSelected = ( productSelected ) => {
        dispatch( onAddProductsSelected( productSelected ) );
    }

    const deleteProductsSelected = ( productSelected ) => {
        dispatch( onDeleteProductsSelected( productSelected ) );
    }

    

    return {
        //*Propiedades
        isCategoryModalOpen,
        productsSelected,

        //*Métodos
        openCategoryModal,
        closeCategoryModal,
        addProductsSelected,
        deleteProductsSelected,
    }

}