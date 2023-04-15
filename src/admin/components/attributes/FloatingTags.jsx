import { useAttUiStore } from '../../../hooks';

export const FloatingTags = () => {

    const { attributesSelected, deleteAttributesSelected} = useAttUiStore();

    const onDeleteTag = (event) => {
        event.preventDefault();
        deleteAttributesSelected( event.target.parentNode.id )
        // console.log(document.getElementById(event.target.parentNode.id))
    }

    const attributes = attributesSelected.map((attribute) => {
        return (
            <div className='tag-container' id={attribute} key={attribute}>
                <p>{attribute}</p>
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