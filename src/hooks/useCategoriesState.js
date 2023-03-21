import { useEffect, useRef, useState } from "react";
import { deleteFileUpload } from "../helpers";
import { useCategoriesStore, useUiStore } from "./";

export const useCategoriesState = () => {
    const { isCategoryModalOpen } = useUiStore();
    const { activeCategory, startUploadFile } = useCategoriesStore();
    const [ imageLoad, setImageLoad ] = useState(false);
    const [ iconLoad, setIconLoad ] = useState(false);

    const imageInputRef = useRef();
    const iconInputRef = useRef();

    useEffect(() => {
        setImageLoad(false);
        setIconLoad(false);
    
    }, [isCategoryModalOpen])


     const onUploadImage = ({ target }) => {
        if(target.files.length != 0){
          if(imageLoad){
            // TODO: Revisar si se está utlizando antes de eliminar
            deleteFileUpload(activeCategory.image.name);
          }
          setImageLoad(true);
          startUploadFile(target.files[0], 'image', 'categories');
        } 
      }
    
      const onUploadIcon = ({ target }) => {
        if(target.files.length != 0){
          if(iconLoad){
            // TODO: Revisar si se está utlizando antes de eliminar
            deleteFileUpload(activeCategory.icon.name);
          }
          setIconLoad(true);
          startUploadFile(target.files[0], 'icon', 'categories');
        }
      }

    return {
        imageLoad,
        iconLoad,
        imageInputRef,
        iconInputRef, 
        onUploadImage,
        onUploadIcon,
    }
}
