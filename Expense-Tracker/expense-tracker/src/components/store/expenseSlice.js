import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: [],
  },
  reducers: {
    addExpense(state, action) {
      state.expenses.push(action.payload);
    },
    restoreExpense(state, action) {
      state.expenses = action.payload;
    },
    resetExpense(state) {
      state.expenses.length = 0;
    },
  },
});

export default expenseSlice.reducer;
export const { addExpense, restoreExpense, resetExpense } =  expenseSlice.actions;