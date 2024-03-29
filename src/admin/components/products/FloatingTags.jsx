import { useUiStore } from '../../../hooks';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

export const FloatingTags = () => {

    const { categoriesSelected, deleteCategoriesSelected } = useUiStore();

    const onDeleteTag = (event) => {
        event.preventDefault();
        deleteCategoriesSelected( event.target.parentNode.id )
        // console.log(document.getElementById(event.target.parentNode.id))
    }

    // const categories = categoriesSelected.map((categories) => {
    //     return (
    //         <div className='tag-container' id={categories} key={categories}>
    //             <p>{categories}</p>
    //             <button className='closeTag-button' onClick={onDeleteTag}>
    //                 X
    //             </button>
    //         </div>
    //     );
    // });

    return (

        !!categoriesSelected && (<div className='tag-container' key={categoriesSelected}>
            <p>{categoriesSelected}</p>
            <button className='closeTag-button' onClick={onDeleteTag}>
                <CancelOutlinedIcon sx={{ fontSize: 'medium' }} />
            </button>
        </div>)
    )
}
