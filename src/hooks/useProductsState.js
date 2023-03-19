import { useEffect, useRef, useState } from "react";
import { deleteFileUpload } from "../helpers";
import { useProductsStore, useUiStore } from "./";

export const useProductsState = () => {
    const { isProductModalOpen, addProductsSelected  } = useUiStore();
    const { activeProduct, startUploadFile } = useProductsStore();
    const [ imageLoad, setImageLoad ] = useState(false);
    const [ iconLoad, setIconLoad ] = useState(false);
    const [ selected, setSelected ] = useState(false);

    const imageInputRef = useRef();
    const iconInputRef = useRef();

    useEffect(() => {
        setImageLoad(false);
        setIconLoad(false);
        setSelected(false);
    
    }, [isProductModalOpen])


     const onUploadImage = ({ target }) => {
        if(target.files.length != 0){
          if(imageLoad){
            deleteFileUpload(activeProduct.image.name);
          }
          setImageLoad(true);
          startUploadFile(target.files[0], 'image', 'products');
        } 
      }
    
      const onUploadIcon = ({ target }) => {
        if(target.files.length != 0){
          if(iconLoad){
            deleteFileUpload(activeProduct.icon.name);
          }
          setIconLoad(true);
          startUploadFile(target.files[0], 'icon', 'products');
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
