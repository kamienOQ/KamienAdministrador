import { useDispatch, useSelector } from 'react-redux';
import { onChargeAttributesByPage, onSetTotalPages } from '../store';

export const useLoadDataPage = () => {
    const dispatch = useDispatch()
    const { attributes, ascending } = useSelector( state => state.attributes );
    const { page } = useSelector( state => state.ui );
    let index = page * 5;
    
    const loadData = () => {
        
        if(attributes.length % 5 > 0){
            dispatch(onSetTotalPages(Math.floor(attributes.length/5) + 1));
        }else{
            dispatch(onSetTotalPages(Math.floor(attributes.length/5)));
        }

        if( ascending === '' ){
            dispatch(onChargeAttributesByPage(attributes.slice(index - 5, index)));
        }
        else if( ascending==='dateAscending' ){
            const attributesArray = [...attributes];
            const sortedArray = attributesArray.sort((a, b) => new Date(a.date) - new Date(b.date));
            dispatch(onChargeAttributesByPage(sortedArray.slice(index - 5, index)));
        }
        else if( ascending==='ascending' ){
            const attributesArray = [...attributes];
            const sortedArray = attributesArray.sort((a, b) => b.categoryName.localeCompare(a.categoryName));
            dispatch(onChargeAttributesByPage(sortedArray.slice(index - 5, index)));
        }
        else if( ascending==='descending' ){
            const attributesArray = [...attributes];
            const sortedArray = attributesArray.sort((a, b) => a.categoryName.localeCompare(b.categoryName));
            dispatch(onChargeAttributesByPage(sortedArray.slice(index - 5, index)));
        }
        else{
            const attributesArray = [...attributes];
            const filteredArray = attributesArray.filter(object => object.categoryName.toLowerCase().includes(ascending.toLowerCase()));
            if(attributes.length % 5 > 0){
                dispatch(onSetTotalPages(Math.floor(filteredArray.length/5) + 1));
            }else{
                dispatch(onSetTotalPages(Math.floor(filteredArray.length/5)));
            }
            dispatch(onChargeAttributesByPage(filteredArray.slice(index - 5, index)));
        }
    }
    
    return{
        loadData
    }
}