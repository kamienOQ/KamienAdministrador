import { useDispatch, useSelector } from 'react-redux';
//Kategories
import { onCleanActiveAttribute, onRestorePage } from '../store';
// Ui
import { onChangePage, onCloseAttributeModal, onDownPage, 
    onOpenAttributeModal, onUpPage} from '../store';

export const useUiStore = () => {

    const dispatch = useDispatch();

    const { 
        isAttributeModalOpen,
        totalPages,
        page,
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

    const openAttributeModal = () => {
        dispatch( onOpenAttributeModal() );
    }

    const closeAttributeModal = () => {
        dispatch( onCloseAttributeModal() );
        dispatch( onCleanActiveAttribute() );
    }

    

    return {
        //*Propiedades
        isAttributeModalOpen,
        totalPages,
        page,

        //*Métodos
        upPage,
        downPage,
        changePage,
        restorePage,
        openAttributeModal,
        closeAttributeModal,
    }

}