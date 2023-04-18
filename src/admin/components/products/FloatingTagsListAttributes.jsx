import { useUiStore } from '../../../hooks';

export const FloatingTagsListAttributes = () => {

    const { listAttributesSelected, deleteListAttributesSelected } = useUiStore();

    const onDeleteTag = (event) => {
        event.preventDefault();
        deleteListAttributesSelected( event.target.parentNode.id )
        // console.log(document.getElementById(event.target.parentNode.id))
    }

    const listAttributes = listAttributesSelected.map((listAttributes) => {
        return (
            <div className='tag-container' id={listAttributes.feature} key={listAttributes.feature}>
                <p>{listAttributes.feature}</p>
                <button className='closeTag-button' onClick={onDeleteTag}>
                    X
                </button>
            </div>
        );
    });

    return (
        !!listAttributesSelected && 
        <div className='tags-container'>{listAttributes}</div>
    )
}
