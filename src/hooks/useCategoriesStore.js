import { useDispatch, useSelector } from "react-redux"
import { onStartNewCategory } from "../store";

export const useCategoriesStore = () => {
    const dispatch = useDispatch()

    const { 
        categories,
        activeCategory
    } = useSelector( state => state.categories );

    const startNewCategory = () => {
        dispatch( onStartNewCategory() )
    }

    return {
        //*Propiedades
        categories,
        activeCategory,

        //*Métodos
        startNewCategory,

    }
}
