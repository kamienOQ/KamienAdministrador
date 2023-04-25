import { useAttUiStore } from "../../../hooks";


export const FloatingTagsAttributes = () => {

    const { attributesSelected, deleteAtributesSelected} = useAttUiStore();

    const onDeleteTag = (event) => {
        event.preventDefault();
        deleteAtributesSelected( event.target.parentNode.id )
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
        !!attributesSelected &&
        <div className='tags-container'>{attributes}</div>
    )
}