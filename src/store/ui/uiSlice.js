import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    theme: true
  },
  reducers: {
    onSetTheme: (state) => {
      state.theme = !state.theme;
    },
  }
});

export const { onSetTheme } = uiSlice.actions;