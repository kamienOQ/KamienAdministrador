import { useDispatch, useSelector } from 'react-redux';
// Product
import { onCleanActiveProduct, onCloseModalViewProduct, onOpenModalViewProduct } from '../store';
//Categories
import { onCleanActiveCategory, onOpenModalViewCategory, onCloseModalViewCategory } from '../store';
// Ui
import { onAddCategoriesSelected, onAddAttributesSelected, onCloseProductModal, onOpenProductModal, 
    onDeleteCategoriesSelected, onDeleteAttributesSelected, onCloseCategoryModal, onOpenCategoryModal } from '../store';

export const useUiStore = () => {

    const dispatch = useDispatch();

    const { 
        isProductModalOpen,
        isCategoryModalOpen,
        categoriesSelected,
        attributesSelected,
        totalPages,
        page,
        isModalViewOpenProduct, 
        isModalViewOpenCategory, 
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

    const addCategoriesSelected = ( categoriesSelected ) => {
        dispatch( onAddCategoriesSelected( categoriesSelected ) )
    }

    const addAttributesSelected = ( attributesSelected ) => {
        dispatch( onAddAttributesSelected( attributesSelected ) )
    }

    const deleteCategoriesSelected = ( categoriesSelected ) => {
        dispatch( onDeleteCategoriesSelected( categoriesSelected ) )
    }

    const deleteAttributesSelected = ( attributesSelected ) => {
        dispatch( onDeleteAttributesSelected( attributesSelected ) )
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

    const openModalViewCategory = () => {
        dispatch( onOpenModalViewCategory() )
    }

    const closeModalViewCategory = () => {
        dispatch( onCloseModalViewCategory() )
    }

    return {
        //*Propiedades
        isProductModalOpen,
        isCategoryModalOpen,
        categoriesSelected,
        attributesSelected,
        isModalViewOpenProduct,
        isModalViewOpenCategory,

        //*Métodos
        addCategoriesSelected,
        addAttributesSelected,
        deleteCategoriesSelected,
        deleteAttributesSelected,
        cleanProductsSelected,
        openProductModal,
        closeProductModal,
        openCategoryModal,
        closeCategoryModal,
        openModalViewProduct,
        closeModalViewProduct,
        openModalViewCategory,
        closeModalViewCategory,
    }

}