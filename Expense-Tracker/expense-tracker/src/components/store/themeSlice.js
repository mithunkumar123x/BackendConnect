// store/themeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    theme: {
      color: 'black',
      background: 'white',
    },
    isDarkMode: false,
  },
  reducers: {
    darkMode(state) {
      state.theme.color = 'white';
      state.theme.background = 'grey';
      state.isDarkMode = true;
    },
    lightMode(state) {
      state.theme.color = 'black';
      state.theme.background = 'white';
      state.isDarkMode = false;
    },
  },
});

export const { darkMode, lightMode } = themeSlice.actions;
export default themeSlice.reducer;
