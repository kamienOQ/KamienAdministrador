

import { useEffect, useRef, useState } from "react";

export const useUserState = () => {
    const [ imageLoad, setImageLoad ] = useState(false);
    useEffect(() => {
        setImageLoad(false);
    }, [])
     const onUploadImage = () => {  //{ target }
        // if(target.files.length != 0){
        //   if(imageLoad){
        //     deleteFileUpload(activeProduct.image.name);
        //   }
          setImageLoad(true);
        //   startUploadFile(target.files[0], 'image', 'users');
       // } 
      }
      return {
        imageLoad,
        onUploadImage
      }
    }
