import { useEffect, useRef, useState } from "react";
import { deleteFileUpload } from "../helpers";
import { useProductsStore, useUiStore } from "./";

export const useProductsState = () => {
  const {
    isProductModalOpen,
    addCategoriesSelected,
    addAttributesSelected,
    addListAttributesSelected,
  } = useUiStore();
  const { activeProduct, startUploadFile, listAttributes } = useProductsStore();
  const [imageLoad, setImageLoad] = useState(false);
  const [iconLoad, setIconLoad] = useState(false);
  const [photoLoad, setPhotoLoad] = useState(false);
  const [selected, setSelected] = useState(false);

  const imageInputRef = useRef();
  const iconInputRef = useRef();
  const photoInputRef = useRef();

  useEffect(() => {
    setImageLoad(false);
    setIconLoad(false);
    setPhotoLoad(false);
    setSelected(false);
  }, [isProductModalOpen]);

  const onUploadImage = ({ target }) => {
    if (target.files.length != 0) {
      if (imageLoad) {
        deleteFileUpload(activeProduct.image.name);
      }
      setImageLoad(true);
      startUploadFile(target.files[0], "image", "products");
    }
  };

  const onUploadIcon = ({ target }) => {
    if (target.files.length != 0) {
      if (iconLoad) {
        deleteFileUpload(activeProduct.icon.name);
      }
      setIconLoad(true);
      startUploadFile(target.files[0], "icon", "products");
    }
  };

  const onUploadPhoto = ({ target }) => {
    if (target.files.length != 0) {
      if (photoLoad) {
        deleteFileUpload(activeProduct.photo.name);
      }
      setPhotoLoad(true);
      startUploadFile(target.files[0], "photo", "products");
    }
  };

  const onSelectCategory = ({ target }) => {
    addCategoriesSelected(target.value);
    setSelected(true);
  };

  const onSelectAttribute = ({ target }) => {
    addAttributesSelected(target.value);
    setSelected(true);
  };

  const onSelectListAttribute = ({ target }) => {
    const listForAttributes = listAttributes.map((valueAttribute) => {
      if (valueAttribute.feature.includes(target.value)) {
        addListAttributesSelected({
          attributeSelected: valueAttribute.attributeSelected,
          feature: target.value,
        });
        setSelected(true);
      }
      //const listForSecondAttribute
      //listAttributes.attributeSelected === target.value
    });
  };

  return {
    imageLoad,
    iconLoad,
    photoLoad,
    selected,
    imageInputRef,
    iconInputRef,
    photoInputRef,
    setImageLoad,
    setPhotoLoad,
    setIconLoad,
    onUploadImage,
    onUploadIcon,
    onUploadPhoto,
    onSelectCategory,
    setSelected,
    onSelectAttribute,
    onSelectListAttribute,
  };
};
