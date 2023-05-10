import { useAttUiStore } from "../../../hooks";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';


export const FloatingTags = () => {

    const { categoriesSelected, deleteCategoriesSelected} = useAttUiStore();

    const onDeleteTag = (event,category) => {
        console.log(categoriesSelected)
        event.preventDefault();
        deleteCategoriesSelected( category );      
        console.log(category)
    }
    const categories = categoriesSelected.map((categories) => {
        
        return (
            <div className='tag-container' id={categories} key={categories}>
                <p>{categories}</p>
                <button className='closeTag-button' onClick={(event)=> onDeleteTag(event, categories)}>
                    <CancelOutlinedIcon sx={{fontSize:'medium'}}/>
                </button>
            </div>
        );
    });

    return (
        !!categoriesSelected &&
        <div className='tags-container'>{categories}</div>
    )
}