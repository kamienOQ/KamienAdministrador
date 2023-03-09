import { useEffect, useRef, useState } from "react";
import { useCategoriesStore, useUiStore } from "./";

export const useCategoriesState = () => {
    const { isCategoryModalOpen, cleanProductsSelected, addProductsSelected } = useUiStore();
    const { addImage, addIcon } = useCategoriesStore();
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
        if(target.files.length != 0){
          setImageLoad(true);
          const reader = new FileReader();
          reader.readAsDataURL(target.files[0]);
          reader.onload = () => {
            addImage( reader.result );
          };
        } 
      }
    
      const onUploadIcon = ({ target }) => {
        if(target.files.length != 0){
          setIconLoad(true);
          const reader = new FileReader();
          reader.readAsDataURL(target.files[0]);
          reader.onload = () => {
            addIcon(reader.result);
          };
        }
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
