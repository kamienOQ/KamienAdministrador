import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        type: null
    },
    reducers: {
        onSetFilter: (state, { payload } ) => {
            state.type = payload;
        },
    }
});


// Action creators are generated for each case reducer function
export const { onSetFilter } = filterSlice.actions;