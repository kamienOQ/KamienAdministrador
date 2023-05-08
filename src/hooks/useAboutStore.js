import { useDispatch, useSelector } from "react-redux";
import { onSetData } from "../store/about/index";
import { onStartGetAbout, onStartUpdateAbout, onStartUploadFile } from "../store/about/thunks";


export const useAboutStore = () => {
    const dispatch = useDispatch();

    const { 
        description,
        instagram,
        name,
        whatsapp,
        logo,
        isSaving
    } = useSelector( state => state.about );

    //*Slice
    const setData = (data) => {
        dispatch( onSetData(data) );
    }

    //*Thunks
    const startUploadFile = (file, collectionName) => {
        dispatch( onStartUploadFile(file, collectionName) );
    }

    const startGetAbout = () => {
        dispatch( onStartGetAbout() );
    }

    const startUpdateAbout = () => {
        dispatch( onStartUpdateAbout() );
    }
    

    return{
        //*Propiedades
        description,
        instagram,
        name,
        whatsapp,
        logo,
        isSaving,
        
        //*Métodos
        setData,
        startUploadFile,
        startGetAbout,
        startUpdateAbout,
    }

}