import { useDispatch, useSelector } from 'react-redux';
//Kategories
import { onCleanCategories, onCleanProductsUploaded, onRestorePage } from '../store';
// Ui
import { onAddProductsSelected, onChangePage, onCleanProductsSelected, onCloseCategoryModal, 
    onDeleteProductsSelected, onDownPage, onOpenCategoryModal, onUpPage, onSearchingName} from '../store';

export const useUiStore = () => {

    const dispatch = useDispatch();

    const { 
        isCategoryModalOpen,
        totalPages,
        page,
        searching,
        productsSelected,
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

    const searchingName = ( search ) => {
        dispatch( onRestorePage() );
        dispatch( onSearchingName( search ) );
    }

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
        totalPages,
        page,
        searching,
        productsSelected,

        //*Métodos
        upPage,
        downPage,
        changePage,
        searchingName,
        openCategoryModal,
        closeCategoryModal,
        addProductsSelected,
        deleteProductsSelected,
    }

}