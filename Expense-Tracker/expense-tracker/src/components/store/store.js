import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import themeReducer from './themeSlice';
import premiumReducer from './premiumSlice';
import expenseReducer from './expenseSlice';

 const store = configureStore({ 
  reducer: {
    auth: authReducer,
    theme : themeReducer,
    premium : premiumReducer,
    expenses: expenseReducer,
  },
});

export default store;
