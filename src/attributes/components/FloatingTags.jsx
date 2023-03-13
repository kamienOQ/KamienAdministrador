import { useUiStore } from '../../hooks';

export const FloatingTags = () => {

    const { categoriesSelected, deleteCategoriesSelected } = useUiStore();

    const onDeleteTag = (event) => {
        event.preventDefault();
        deleteCategoriesSelected( event.target.parentNode.id )
    }

    const categories = categoriesSelected.map((category) => {
        return (
            <div className='tag-container' id={category} key={category}>
                <p>{category}</p>
                <button className='closeTag-button' onClick={onDeleteTag}>
                    X
                </button>
            </div>
        );
    });

    return (
        <div className='tags-container'>{categories}</div>
    )
}
