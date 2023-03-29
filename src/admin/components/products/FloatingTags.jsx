import { useUiStore } from '../../../hooks';

export const FloatingTags = () => {

    const { productsSelected, deleteProductsSelected } = useUiStore();

    const onDeleteTag = (event) => {
        event.preventDefault();
        deleteProductsSelected( event.target.parentNode.id )
        // console.log(document.getElementById(event.target.parentNode.id))
    }

    const products = productsSelected.map((product) => {
        return (
            <div className='tag-container' id={product} key={product}>
                <p>{product}</p>
                <button className='closeTag-button' onClick={onDeleteTag}>
                    X
                </button>
            </div>
        );
    });

    return (
        <div className='tags-container'>{products}</div>
    )
}
