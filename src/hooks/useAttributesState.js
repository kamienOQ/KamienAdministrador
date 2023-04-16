import { useEffect, useRef, useState } from "react";
import { deleteFileUpload } from "../helpers";
import { useAttributesStore, useAttUiStore } from ".";

export const useAttributesState = () => {
  const { isCategoryModalOpen, addCategoriesSelected} = useAttUiStore();
  const { attributes, activeAttribute, startUploadFile } = useAttributesStore();
  const [imageLoad, setImageLoad] = useState(false);
  const [iconLoad, setIconLoad] = useState(false);
  const [ selected, setSelected ] = useState(false);

  const imageInputRef = useRef();
  const iconInputRef = useRef();

  useEffect(() => {
    setImageLoad(false);
    setIconLoad(false);
    setSelected(false);
  }, [isCategoryModalOpen]);

  const onUploadImage = ({ target }) => {
    if (target.files.length != 0) {
      if (imageLoad) {
        let usingImage = false;
        attributes.forEach((object) => {
          if (object.image.name === activeAttribute.image.name) {
            usingImage = true;
            return;
          }
        });
        if (!usingImage) {
          deleteFileUpload(activeAttribute.image.name);
        }
      }
      setImageLoad(true);
      startUploadFile(target.files[0], "image", "attributes");
    }
  };

  const onUploadIcon = ({ target }) => {
    if (target.files.length != 0) {
      if (iconLoad) {
        let usingIcon = false;
        attributes.forEach((object) => {
          if (object.icon.name === activeAttribute.icon.name) {
            usingIcon = true;
            return;
          }
        });
        if (!usingIcon) {
          deleteFileUpload(activeAttribute.icon.name);
        }
      }
      setIconLoad(true);
      startUploadFile(target.files[0], "icon", "attributes");
    }
  };
  
  const onSelectCategories = ({ target }) => {
    addCategoriesSelected(target.value);
    setSelected(true);
  }

  return {
    imageLoad,
    iconLoad,
    selected,
    imageInputRef,
    iconInputRef,
    setSelected,
    onUploadImage,
    onUploadIcon,
    setImageLoad,
    setIconLoad,
    onSelectCategories
  };
};
