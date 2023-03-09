import { useDispatch, useSelector } from "react-redux";
import { onAddIcon, onAddImage, onAddNewCategory, onAddProducts, OnCleanCategories, onSetActiveCategory } from "../store";

export const useCategoriesStore = () => {
    const dispatch = useDispatch();

    //*Slice
    const { 
        categories,
        activeCategory
    } = useSelector( state => state.categories );

    const addNewCategory = () => {
        dispatch( onAddNewCategory() );
    }

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

    const cleanCategories = () => {
        dispatch( OnCleanCategories() );
    }
    

    //*Thunks

    // const startNewCategory = () => {
    //     dispatch( onStartNewCategory() );
    // }

    return {
        //*Propiedades
        categories,
        activeCategory,

        //*Métodos
        addNewCategory,
        setActiveCategory,
        addImage,
        addIcon,
        addProducts,
        cleanCategories

    }
}
