import { useDispatch, useSelector } from 'react-redux';
//Categories
import { onCleanActiveCategory } from '../store';
// Ui
import { onCloseCategoryModal, onOpenCategoryModal} from '../store';

export const useUiStore = () => {

    const dispatch = useDispatch();

    const { 
        isCategoryModalOpen,
    } = useSelector( state => state.ui );

    const openCategoryModal = () => {
        dispatch( onOpenCategoryModal() );
    }

    const closeCategoryModal = () => {
        dispatch( onCloseCategoryModal() );
        dispatch( onCleanActiveCategory() );
    }

    

    return {
        //*Propiedades
        isCategoryModalOpen,

        //*Métodos
        openCategoryModal,
        closeCategoryModal,
    }

}