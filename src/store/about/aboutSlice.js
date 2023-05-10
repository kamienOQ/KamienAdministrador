import { createSlice } from '@reduxjs/toolkit';

export const aboutSlice = createSlice({
    name: 'about',
    initialState: {
        description: '',
        instagram: '',
        name: '',
        whatsapp: '',
        logo: '',
        isSaving: false
    },
    reducers: {

        onSetData: (state, {payload} ) => {
            state.description = payload[0]?.description;
            state.instagram = payload[0]?.instagram;
            state.name = payload[0]?.name;
            state.logo = payload[0]?.logo;
            const whatsapp = payload[0]?.whatsapp.toString();
            if( !!whatsapp ){
                if ( whatsapp.length < 8 || whatsapp.includes('-') ){
                    state.whatsapp = whatsapp;
                }else{
                    state.whatsapp = whatsapp.slice(0, 4) + "-" + whatsapp.slice(4, 8);
                }
            }
        },
        onChangeSavingAbout: ( state, {payload} ) => {
            state.isSaving = payload;
        },
        onAddLogo: ( state, {payload} ) => {
            state.logo = payload;
        }
    }
});


// Action creators are generated for each case reducer function
export const { 
    onSetData,
    onChangeSavingAbout,
    onAddLogo 

} = aboutSlice.actions;