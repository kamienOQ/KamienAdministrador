import { useDispatch, useSelector } from "react-redux"
import { onAddIcon, onAddImage, onAddProducts, onSetActiveCategory, onStartNewCategory } from "../store";

export const useCategoriesStore = () => {
    const dispatch = useDispatch()

    //*Slice
    const { 
        categories,
        activeCategory
    } = useSelector( state => state.categories );

    const setActiveCategory = ( category ) => {
        dispatch( onSetActiveCategory( category ) );
    }

    const addImage = ( images ) => {
        dispatch( onAddImage( images ) );
    }

    const addIcon = ( images ) => {
        dispatch( onAddIcon( images ) );
    }

    const addProducts = ( products ) => {
        dispatch( onAddProducts( products ) );
    }

    //*Thunks

    const startNewCategory = () => {
        dispatch( onStartNewCategory() );
    }

    return {
        //*Propiedades
        setActiveCategory,
        categories,
        activeCategory,
        addProducts,

        //*Métodos
        addImage,
        addIcon,
        startNewCategory,

    }
}
