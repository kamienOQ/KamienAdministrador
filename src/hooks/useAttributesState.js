import { useEffect, useRef, useState } from "react";
//import { deleteFileUpload } from "../helpers/deleteFileUpload";
import { useAttributesStore, useUiStore } from "./";

export const useAttributesState = () => {
    const { isAttributeModalOpen, addCategoriesSelected } = useUiStore();
    //const { activeAttribute, startUploadFile } = useAttributesStore();
    const [ selected, setSelected ] = useState(false);

    //const imageInputRef = useRef();
    //const iconInputRef = useRef();

    useEffect(() => {
        setSelected(false);
    
    }, [isAttributeModalOpen])

    
    const onSelectCategory = ({ target }) => {
        addCategoriesSelected(target.value);
        setSelected(true);
    }


    return {
        
        selected,
        onSelectCategory
    }
}