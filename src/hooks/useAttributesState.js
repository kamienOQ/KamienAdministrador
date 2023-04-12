import { useEffect, useRef, useState } from "react";
import { deleteFileUpload } from "../helpers";
import { useAttributesStore, useUiStore } from ".";

export const useAttributesState = () => {
  const { isAttributeModalOpen } = useUiStore();
  const { attributes, activeAttribute, startUploadFile } = useAttributesStore();
  const [imageLoad, setImageLoad] = useState(false);
  const [iconLoad, setIconLoad] = useState(false);

  const imageInputRef = useRef();
  const iconInputRef = useRef();

  useEffect(() => {
    setImageLoad(false);
    setIconLoad(false);
  }, [isAttributeModalOpen]);

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

  return {
    imageLoad,
    iconLoad,
    imageInputRef,
    iconInputRef,
    onUploadImage,
    onUploadIcon,
  };
};
