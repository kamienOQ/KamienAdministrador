import { useDispatch, useSelector } from 'react-redux';
import { onSetTotalPages } from '../store/ui/uiSlice';
import { onChargeProductsByPage, } from '../store/products/productsSlice';

export const useLoadDataPage = () => {
    const dispatch = useDispatch()
    const { products, categories, ascending } = useSelector( state => state.products );
    const { page } = useSelector( state => state.ui );
    let index = page * 5;
    
    const loadData = () => {    
        
        if(products.length % 5 > 0){
            dispatch(onSetTotalPages(Math.floor(products.length/5) + 1));
        }else{
            dispatch(onSetTotalPages(Math.floor(products.length/5)));
        }

        if( ascending === '' ){
            dispatch(onChargeProductsByPage(products.slice(index - 5, index)));
        }
        else if( ascending === 'dateAscending' ){
            const productsArray = [...products];
            const sortedArray = productsArray.sort((a, b) => new Date(a.date) - new Date(b.date));
            dispatch(onChargeProductsByPage(sortedArray.slice(index - 5, index)));
        }
        else if( ascending==='ascending' ){
            const productsArray = [...products];
            const sortedArray = productsArray.sort((a, b) => b.productName.localeCompare(a.productName));
            dispatch(onChargeProductsByPage(sortedArray.slice(index - 5, index)));
        }
        else if( ascending==='descending' ){
            const productsArray = [...products];
            const sortedArray = productsArray.sort((a, b) => a.productName.localeCompare(b.productName));
            dispatch(onChargeProductsByPage(sortedArray.slice(index - 5, index)));
        }
        else{
            const productsArray = [...products];
            const filteredArray = productsArray.filter(object => object.productNameLowerCase.includes(ascending));
            if(products.length % 5 > 0){
                dispatch(onSetTotalPages(Math.floor(filteredArray.length/5) + 1));
            }else{
                dispatch(onSetTotalPages(Math.floor(filteredArray.length/5)));
            }
            dispatch(onChargeProductsByPage(filteredArray.slice(index - 5, index)));
        }    
    }

    const loadData1 = () => {
        
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
            const filteredArray = categoriesArray.filter(object => object.categoryName.toLowerCase().includes(ascending.toLowerCase()));
            if(categories.length % 5 > 0){
                dispatch(onSetTotalPages(Math.floor(filteredArray.length/5) + 1));
            }else{
                dispatch(onSetTotalPages(Math.floor(filteredArray.length/5)));
            }
            dispatch(onChargeCategoriesByPage(filteredArray.slice(index - 5, index)));
        }
    }
    
    return{
        loadData,
        loadData1
    }
}