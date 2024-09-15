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
            incrementBy2  : ( state) => {
                state.value += 2;
            },
               
            decrement : (state) => {
                if (state.value > 0) {
                    state.value -= 1;
                }
            },
             decrementBy2  : ( state) => {
                state.value -= 5;
            },
         }
    })

    export const  { increment,decrement , incrementBy5 , incrementBy2,decrementBy5 } = counterSlice.actions;
    export default counterSlice.reducer;

