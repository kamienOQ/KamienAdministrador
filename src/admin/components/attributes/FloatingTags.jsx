import { useAttUiStore } from "../../../hooks";


export const FloatingTags = () => {

    const { categoriesSelected, deleteAttributesSelected} = useAttUiStore();

    const onDeleteTag = (event) => {
        event.preventDefault();
        deleteAttributesSelected( event.target.parentNode.id )
        // console.log(document.getElementById(event.target.parentNode.id))
    }
    const categories = categoriesSelected.map((categories) => {
        return (
            <div className='tag-container' id={categories} key={categories}>
                <p>{categories}</p>
                <button className='closeTag-button' onClick={onDeleteTag}>
                    X
                </button>
            </div>
        );
    });

    return (
        !!categoriesSelected &&
        <div className='tags-container'>{categories}</div>
    )
}