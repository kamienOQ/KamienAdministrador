import { useDispatch, useSelector } from 'react-redux';
// Product
import { onCleanActiveProduct, onCloseModalViewProduct, onOpenModalViewProduct } from '../store';
//Categories
import { onCleanActiveCategory, onOpenModalViewCategory, onCloseModalViewCategory } from '../store';
// Ui
import { onAddCategoriesSelected, onAddAttributesSelected, onAddListAttributesSelected, onCloseProductModal, 
    onOpenProductModal, onDeleteCategoriesSelected, onDeleteAttributesSelected, 
    onDeleteListAttributesSelected, onCloseCategoryModal, onOpenCategoryModal } from '../store';

export const useUiStore = () => {

    const dispatch = useDispatch();

    const { 
        isProductModalOpen,
        isCategoryModalOpen,
        categoriesSelected,
        attributesSelected,
        listAttributesSelected,
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

    const addListAttributesSelected = ( listAttributesSelected ) => {
        dispatch( onAddListAttributesSelected( listAttributesSelected ) )
    }

    const deleteCategoriesSelected = () => {
        dispatch( onDeleteCategoriesSelected() )
    }

    const deleteAttributesSelected = ( attributesSelected ) => {
        dispatch( onDeleteAttributesSelected( attributesSelected ) )
    }

    const deleteListAttributesSelected = ( listAttributesSelected ) => {
        dispatch( onDeleteListAttributesSelected( listAttributesSelected ) )
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
        listAttributesSelected,
        isModalViewOpenProduct,
        isModalViewOpenCategory,

        //*Métodos
        addCategoriesSelected,
        addAttributesSelected,
        deleteCategoriesSelected,
        deleteAttributesSelected,
        addListAttributesSelected,
        deleteListAttributesSelected,
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