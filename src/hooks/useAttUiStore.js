import { useDispatch, useSelector } from 'react-redux';
//Attributes
import { onCleanActiveCategory, onCloseModalView, onOpenModalView } from '../store';
// Ui
import { onCloseCategoryModal, onOpenCategoryModal, onAddAttributesSelected, onDeleteAttributesSelected} from '../store';

export const useAttUiStore = () => {

    const dispatch = useDispatch();

    const { 
        isCategoryModalOpen,
        isModalViewOpen,
        attributesSelected,
    } = useSelector( state => state.ui );

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

    const addAttributesSelected = ( attributesSelected ) => {
        dispatch( onAddAttributesSelected( attributesSelected ) )
    }

    const deleteAttributesSelected = ( attributesSelected ) => {
        dispatch( onDeleteAttributesSelected( attributesSelected ) )
    }

    

    return {
        //*Propiedades
        isCategoryModalOpen,
        isModalViewOpen,
        attributesSelected,

        //*Métodos
        addAttributesSelected,
        openCategoryModal,
        closeCategoryModal,
        openModalView,
        closeModalView,
        deleteAttributesSelected,
    }

}