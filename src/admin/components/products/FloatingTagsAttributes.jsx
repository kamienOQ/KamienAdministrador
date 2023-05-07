import { useUiStore } from '../../../hooks';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

export const FloatingTagsAttributes = () => {

    const { attributesSelected, deleteAttributesSelected } = useUiStore();
    const onDeleteTag = ( event, attribute ) => {
        event.preventDefault();
        deleteAttributesSelected( attribute )
        // console.log(document.getElementById(event.target.parentNode.id))
    }

    const attributes = attributesSelected.map((attributes) => {
        return (
            <div className='tag-container' id={attributes} key={attributes}>
                <p>{attributes}</p>
                <button className='closeTag-button' onClick={( event ) => onDeleteTag(event, attributes) }>
                    < CancelOutlinedIcon sx={{ fontSize: 'medium', alignContent: 'center' }}/>
                </button>
            </div>
        );
    });

    return (
        !!attributesSelected && 
        <div className='tags-container'>{attributes}</div>
    )
}
