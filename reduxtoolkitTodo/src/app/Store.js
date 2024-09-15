import { configureStore } from "@reduxjs/toolkit";
import todoReducer from '../feature/todo/todoSlice'


 const Store = configureStore({
    reducer : todoReducer
})

export default Store;