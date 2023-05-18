import { createSlice } from '@reduxjs/toolkit';

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        editSuccess: false
    },
    reducers: {
        onChangeEditSuccess: (state, action) => {
            state.editSuccess = action.payload;
        },
    }
});


// Action creators are generated for each case reducer function
export const { onChangeEditSuccess } = usersSlice.actions;