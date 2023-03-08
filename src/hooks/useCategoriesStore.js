import { useDispatch, useSelector } from "react-redux"
import { onAddImages, onAddProducts, onSetActiveCategory, onStartNewCategory } from "../store";

export const useCategoriesStore = () => {
    const dispatch = useDispatch()

    //*Slice
    const { 
        categories,
        activeCategory
    } = useSelector( state => state.categories );

    const setActiveCategory = ( category ) => {
        dispatch( onSetActiveCategory( category ) )
    }

    const addImages = ( images ) => {
        dispatch( onAddImages( images ) )
    }

    const addProducts = ( products ) => {
        dispatch( onAddProducts( products ) )
    }

    //*Thunks

    const startNewCategory = () => {
        dispatch( onStartNewCategory() )
    }

    return {
        //*Propiedades
        setActiveCategory,
        categories,
        activeCategory,
        addProducts,

        //*Métodos
        addImages,
        startNewCategory,

    }
}
