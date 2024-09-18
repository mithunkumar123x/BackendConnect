import { configureStore } from '@reduxjs/toolkit';
import uiSlice from './UI-Slice';
import cartSlice from './cart-Slice';

const store = configureStore({
    reducer: {
         ui : uiSlice.reducer,
         cart : cartSlice.reducer 

    }
});

export default store;