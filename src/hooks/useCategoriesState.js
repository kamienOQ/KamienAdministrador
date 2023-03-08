import { useEffect, useRef, useState } from "react";
import { useUiStore } from "./";

export const useCategoriesState = () => {
    const { isCategoryModalOpen, cleanProductsSelected, addProductsSelected } = useUiStore();
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
        imageLoad,
        iconLoad,
        selected,
        imageInputRef,
        iconInputRef, 
        onUploadImage,
        onUploadIcon,
        onSelectProduct
    }
}
