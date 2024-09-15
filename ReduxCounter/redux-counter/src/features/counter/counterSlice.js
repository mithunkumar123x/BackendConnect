import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value : 0,
    text : 'Counter'
}

    export const counterSlice = createSlice( {
         name : 'counter',
         initialState,
         reducers : {
            // properties and function
            increment : (state) => {
                    state.value += 1; 
                },

            incrementBy5  : ( state) => {
                state.value += 5;
            },
               
            decrement : (state) => {
                if (state.value > 0) {
                    state.value -= 1;
                }
            },
         }
    })

    export const  { increment,decrement , incrementBy5 } = counterSlice.actions;
    export default counterSlice.reducer;

