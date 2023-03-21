import { useEffect, useRef, useState } from "react";
import { deleteFileUpload } from "../helpers";
import { useCategoriesStore, useUiStore } from "./";

export const useCategoriesState = () => {
  const { isCategoryModalOpen } = useUiStore();
  const { categories, activeCategory, startUploadFile } = useCategoriesStore();
  const [imageLoad, setImageLoad] = useState(false);
  const [iconLoad, setIconLoad] = useState(false);

  const imageInputRef = useRef();
  const iconInputRef = useRef();

  useEffect(() => {
    setImageLoad(false);
    setIconLoad(false);
  }, [isCategoryModalOpen]);

  const onUploadImage = ({ target }) => {
    if (target.files.length != 0) {
      if (imageLoad) {
        let usingImage = false;
        categories.forEach((object) => {
          if (object.image.name === activeCategory.image.name) {
            usingImage = true;
            return;
          }
        });
        if (!usingImage) {
          deleteFileUpload(activeCategory.image.name);
        }
      }
      setImageLoad(true);
      startUploadFile(target.files[0], "image", "categories");
    }
  };

  const onUploadIcon = ({ target }) => {
    if (target.files.length != 0) {
      if (iconLoad) {
        let usingIcon = false;
        categories.forEach((object) => {
          if (object.icon.name === activeCategory.icon.name) {
            usingIcon = true;
            return;
          }
        });
        if (!usingIcon) {
          deleteFileUpload(activeCategory.icon.name);
        }
      }
      setIconLoad(true);
      startUploadFile(target.files[0], "icon", "categories");
    }
  };

  return {
    imageLoad,
    iconLoad,
    imageInputRef,
    iconInputRef,
    onUploadImage,
    onUploadIcon,
  };
};
