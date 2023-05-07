import { useUiStore } from '../../../hooks';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

export const FloatingTagsListAttributes = () => {

    const { listAttributesSelected, deleteListAttributesSelected } = useUiStore();

    const onDeleteTag = ( event, listAttribute ) => {
        event.preventDefault();
        deleteListAttributesSelected( listAttribute )
        // console.log(document.getElementById(event.target.parentNode.id))
    }

    const listAttributes = listAttributesSelected.map((listAttributes) => {
        return (
            <div className='tag-container' id={listAttributes.feature} key={listAttributes.feature}>
                <p>{listAttributes.feature}</p>
                <button className='closeTag-button' onClick={( event ) => onDeleteTag( event, listAttributes )}>
                    < CancelOutlinedIcon sx={{ fontSize: 'medium', borderTop: '20px' }}/>
                </button>
            </div>
        );
    });

    return (
        !!listAttributesSelected && 
        <div className='tags-container'>{listAttributes}</div>
    )
}
