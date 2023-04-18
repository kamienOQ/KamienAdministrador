import { useUiStore } from '../../../hooks';

export const FloatingTagsAttributes = () => {

    const { attributesSelected, deleteAttributesSelected } = useUiStore();

    const onDeleteTag = (event) => {
        event.preventDefault();
        deleteAttributesSelected( event.target.parentNode.id )
        // console.log(document.getElementById(event.target.parentNode.id))
    }

    const attributes = attributesSelected.map((attributes) => {
        return (
            <div className='tag-container' id={attributes} key={attributes}>
                <p>{attributes}</p>
                <button className='closeTag-button' onClick={onDeleteTag}>
                    X
                </button>
            </div>
        );
    });

    return (
        <div className='tags-container'>{attributes}</div>
    )
}
