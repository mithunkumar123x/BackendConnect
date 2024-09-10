import { configureStore } from "@reduxjs/toolkit";
import todoReducer from '../feature/todo/todoSlice'


export const Store = configureStore({
    reducer : todoReducer
})