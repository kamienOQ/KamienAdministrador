import { useDispatch, useSelector } from 'react-redux'
import { onCleanAttributes, onCleanCategoriesUploaded } from '../store';
import { onAddCategoriesSelected, onCleanCategoriesSelected, onCloseAttributeModal, onDeleteCategoriesSelected, onOpenAttributeModal } from '../store/ui/uiSlice'

export const useUiStore = () => {

    const dispatch = useDispatch()

    const { 
        isAttributeModalOpen,
        categoriesSelected
    } = useSelector( state => state.ui )

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
        isAttributeModalOpen,
        categoriesSelected,

        //*Métodos
        openAttributeModal,
        closeAttributeModal,
        addCategoriesSelected,
        deleteCategoriesSelected
    }

}