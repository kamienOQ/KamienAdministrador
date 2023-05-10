import { useDispatch, useSelector } from 'react-redux';
// //Categories
// import { onCleanActiveCategory } from '../store/categories';
// Ui
import { onCloseCategoryModal, onOpenCategoryModal, onCloseModalView, onOpenModalView, onOpenModalViewCategory, 
    onCloseModalViewCategory, onAddAttributesSelected, onAddListAttributesSelected, onCloseProductModal, 
    onOpenProductModal, onDeleteAttributesSelected, onDeleteListAttributesSelected, onAddCategoriesSelected, 
    onDeleteCategoriesSelected, } from '../store/ui/uiSlice';
// Product
import { onCloseModalViewProduct, onOpenModalViewProduct } from '../store';
import { onCleanActiveProduct } from '../store/products/productsSlice';
//Categories
import { onCleanActiveCategory,  } from '../store/categories';


export const useUiStore = () => {

    const dispatch = useDispatch();

    const { 
        isCategoryModalOpen,
        isProductModalOpen,
        isModalViewOpen,
        categoriesSelected,
        attributesSelected,
        listAttributesSelected,
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

    const openModalView = () => {
        dispatch( onOpenModalView() );
    }

    const closeModalView = () => {
        dispatch( onCloseModalView() );
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
        isCategoryModalOpen,
        isModalViewOpen,
        isProductModalOpen,
        isCategoryModalOpen,
        categoriesSelected,
        attributesSelected,
        listAttributesSelected,
        isModalViewOpenProduct,

        //*Métodos
        openCategoryModal,
        closeCategoryModal,
        openModalView,
        closeModalView,
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