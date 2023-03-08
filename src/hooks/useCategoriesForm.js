import { useEffect, useRef, useState } from "react";
import { useUiStore } from "./";

export const useCategoriesForm = ( initialForm = {} ) => {
    const { isCategoryModalOpen, cleanProductsSelected, addProductsSelected } = useUiStore();
    const [ formState, setFormState ] = useState( initialForm );
    const [ imageLoad, setImageLoad ] = useState(false);
    const [ iconLoad, setIconLoad ] = useState(false);
    const [ selected, setSelected ] = useState(false);

    const imageInputRef = useRef();
    const iconInputRef = useRef();

    useEffect(() => {
        setImageLoad(false);
        setIconLoad(false);
        setSelected(false);
        cleanProductsSelected();
    
    }, [isCategoryModalOpen])

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    const onUploadImage = ({ target }) => {
        // setImageLoad(true);
        setImageLoad(target.files[0]);
        imageInputRef.current.value = target.files[0].name;
      }
    
      const onUploadIcon = ({ target }) => {
        // setIconLoad(true);
        setIconLoad(target.files[0]);
        iconInputRef.current.value = target.files[0].name;
      }
    
      const onSelectProduct = ({ target }) => {
        addProductsSelected(target.value);
        setSelected(true);
      }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,

        imageLoad,
        iconLoad,
        selected,
        imageInputRef,
        iconInputRef,
        onUploadImage,
        onUploadIcon,
        onSelectProduct,
    }
}
