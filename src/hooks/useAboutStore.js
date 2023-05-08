import { useDispatch, useSelector } from "react-redux";
import { onSetData } from "../store/about/index";
import { onStartGetAbout, onStartUpdateAbout } from "../store/about/thunks";


export const useAboutStore = () => {
    const dispatch = useDispatch();

    const { 
        description,
        instagram,
        name,
        whatsapp
    } = useSelector( state => state.about );

    //*Slice
    const setData = (data) => {
        dispatch( onSetData(data) );
    }

    //*Thunks
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
        
        //*Métodos
        setData,
        startGetAbout,
        startUpdateAbout,
    }

}