import { onAddNewCategory, onSetActiveCategory } from "./";


export const onStartNewCategory = () => {
    return /* async */( dispatch, getState ) => {

        // const { uid } = getState().auth;

        const newNote = {
            categoryName: '',
            products: [],
            images: [],
            date: new Date().getTime(),
        }

        // const newDoc = doc( collection( FirebaseDB, `/${ uid }/journal/notes` ) );
        // const setDocResp = await setDoc( newDoc, newNote );
        
        
        dispatch( onAddNewCategory( newNote ) );
        dispatch( onSetActiveCategory( newNote ) );

    }

    //TODO: onStartLoadingCategories
    //TODO: onStartSaveCategory
    //TODO: onStartDeletingCategory
}