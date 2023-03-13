import { useDispatch, useSelector } from 'react-redux'
import { onAddCategoriesSelected, oncleanCategoriesSelected, onCloseAttributeModal, onDeleteCategoriesSelected, onOpenAttributeModal } from '../store/ui/uiSlice'

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
        dispatch( onCloseAttributeModal() )
    }

    const addCategoriesSelected = ( categorieselected ) => {
        dispatch( onAddCategoriesSelected( categorySelected ) )
    }

    const deleteCategoriesSelected = ( categorySelected ) => {
        dispatch( onDeleteCategoriesSelected( categorySelected ) )
    }

    const cleanCategoriesSelected = () => {
        dispatch( oncleanCategoriesSelected() )
    }
    

    return {
        //*Propiedades
        isAttributeModalOpen,
        categoriesSelected,

        //*Métodos
        openAttributeModal,
        closeAttributeModal,
        addCategoriesSelected,
        deleteCategoriesSelected,
        cleanCategoriesSelected
    }

}