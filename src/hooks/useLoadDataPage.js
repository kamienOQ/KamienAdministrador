import { useDispatch, useSelector } from 'react-redux';
import { onChargeProductsByPage, onSetTotalPages } from '../store';

export const useLoadDataPage = () => {
    const dispatch = useDispatch()
    const { products, ascending } = useSelector( state => state.products );
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
    
    return{
        loadData
    }
}
