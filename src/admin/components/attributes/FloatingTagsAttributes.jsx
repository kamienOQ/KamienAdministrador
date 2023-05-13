import { useAttUiStore } from "../../../hooks";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';


export const FloatingTagsAttributes = () => {

    const { attributesSelected, deleteAtributesSelected} = useAttUiStore();

    const onDeleteTag = (event,attribute) => {
        event.preventDefault();
        deleteAtributesSelected( attribute )
    }
    const attributes = attributesSelected.map((attributes) => {
        return (
            <div className='tag-container' id={attributes} key={attributes}>
                <p>{attributes}</p>
                <button className='closeTag-button' onClick={(event)=> onDeleteTag(event, attributes)}>
                    <CancelOutlinedIcon sx={{fontSize:'medium'}}/>
                </button>
            </div>
        );
    });

    return (
        !!attributesSelected &&
        <div className='tags-container'>{attributes}</div>
    )
}