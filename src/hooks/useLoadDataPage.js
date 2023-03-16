import { useDispatch, useSelector } from 'react-redux';
import { onChargeCategoriesByPage, onSetTotalPages } from '../store';

export const useLoadDataPage = () => {
    const dispatch = useDispatch()
    const { categories, ascending } = useSelector( state => state.categories );
    const { page } = useSelector( state => state.ui );
    let index = page * 5;
    
    const loadData = () => {
        
        if(categories.length % 5 > 0){
            dispatch(onSetTotalPages(Math.floor(categories.length/5) + 1));
        }else{
            dispatch(onSetTotalPages(Math.floor(categories.length/5)));
        }

        if( ascending === '' ){
            dispatch(onChargeCategoriesByPage(categories.slice(index - 5, index)));
        }
        else if( ascending==='dateAscending' ){
            const categoriesArray = [...categories];
            const sortedArray = categoriesArray.sort((a, b) => new Date(a.date) - new Date(b.date));
            dispatch(onChargeCategoriesByPage(sortedArray.slice(index - 5, index)));
        }
        else if( ascending==='ascending' ){
            const categoriesArray = [...categories];
            const sortedArray = categoriesArray.sort((a, b) => b.categoryName.localeCompare(a.categoryName));
            dispatch(onChargeCategoriesByPage(sortedArray.slice(index - 5, index)));
        }
        else if( ascending==='descending' ){
            const categoriesArray = [...categories];
            const sortedArray = categoriesArray.sort((a, b) => a.categoryName.localeCompare(b.categoryName));
            dispatch(onChargeCategoriesByPage(sortedArray.slice(index - 5, index)));
        }
        else{
            const categoriesArray = [...categories];
            const filteredArray = categoriesArray.filter(object => object.categoryNameLowerCase.includes(ascending));
            if(categories.length % 5 > 0){
                dispatch(onSetTotalPages(Math.floor(filteredArray.length/5) + 1));
            }else{
                dispatch(onSetTotalPages(Math.floor(filteredArray.length/5)));
            }
            dispatch(onChargeCategoriesByPage(filteredArray.slice(index - 5, index)));
        }
    }
    
    return{
        loadData
    }
}
