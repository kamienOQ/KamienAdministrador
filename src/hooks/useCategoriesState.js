import { useEffect, useRef, useState } from "react";
import { deleteFileUpload } from "../helpers/deleteFileUpload";
import { useCategoriesStore, useUiStore } from "./";

export const useCategoriesState = () => {
    const { isCategoryModalOpen, cleanProductsSelected, addProductsSelected } = useUiStore();
    const { activeCategory, startUploadFile } = useCategoriesStore();
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
          if(imageLoad){
            deleteFileUpload(activeCategory.image.name);
          }
          setImageLoad(true);
          startUploadFile(target.files[0], 'image', 'categories');

          // const reader = new FileReader();
          // reader.readAsDataURL(target.files[0]);
          // reader.onload = () => {
          //   addImage( reader.result );
          // };
        } 
      }
    
      const onUploadIcon = ({ target }) => {
        if(target.files.length != 0){
          if(iconLoad){
            deleteFileUpload(activeCategory.icon.name);
          }
          setIconLoad(true);
          startUploadFile(target.files[0], 'icon', 'categories');

          // const reader = new FileReader();
          // reader.readAsDataURL(target.files[0]);
          // reader.onload = () => {
          //   addIcon(reader.result);
          // };
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
