import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
    token: localStorage.getItem('token') || null,
    isLoggedIn : !!localStorage.getItem('token'),
    isLoading : false,

};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        login(state,action) {
            state.token = action.payload;
            state.isLoggedIn = true;
            localStorage.setItem('token', action.payload);
        },

        logout(state) {
            state.token = null;
            state.isLoggedIn = false;
            localStorage.removeItem('token');
        },
        setLoading(state,action) {
            state.isLoading = action.payload;
         }
    },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;