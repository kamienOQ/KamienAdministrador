import { useDispatch, useSelector } from 'react-redux'
import { onCleanAttributes, onCleanCategoriesUploaded } from '../store';
import { onAddCategoriesSelected, onCleanCategoriesSelected, onCloseAttributeModal, onDeleteCategoriesSelected, onOpenAttributeModal } from '../store/ui/uiSlice'

export const useUiStore = () => {

    const dispatch = useDispatch();

    const { 
        isProductModalOpen,
        isCategoryModalOpen,
        productsSelected,
        totalPages,
        page,
        isAttributeModalOpen,
        categoriesSelected
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

    const openCategoryModal = () => {
        dispatch( onOpenCategoryModal() );
    }

    const closeCategoryModal = () => {
        dispatch( onCloseCategoryModal() );
        dispatch( onCleanActiveCategory() );
    }

    const openAttributeModal = () => {
        dispatch( onOpenAttributeModal() )
    }

    const closeAttributeModal = () => {
        dispatch( onCloseAttributeModal() );
        dispatch( onCleanAttributes() );
        dispatch( onCleanCategoriesSelected() );
        dispatch( onCleanCategoriesUploaded() );
    }

    const addCategoriesSelected = ( categorySelected ) => {
        dispatch( onAddCategoriesSelected( categorySelected ) )
    }

    const deleteCategoriesSelected = ( categorySelected ) => {
        dispatch( onDeleteCategoriesSelected( categorySelected ) )
    }



    return {
        //*Propiedades
        isProductModalOpen,
        productsSelected,
        isCategoryModalOpen,
        totalPages,
        page,
        isAttributeModalOpen,
        categoriesSelected,

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
        openCategoryModal,
        closeCategoryModal,
        openAttributeModal,
        closeAttributeModal,
        addCategoriesSelected,
        deleteCategoriesSelected,

    }

}