import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { restoreExpense, resetExpense } from '../store/expenseSlice';
import { darkMode, lightMode } from '../store/themeSlice';
import { activatePremium } from '../store/premiumSlice';
import { convertToCSV } from '../utils/csvUtils';

const ExpenseList = ({ onEditExpense }) => {
  const expenses = useSelector((store) => store.expenses.expenses);
  const theme = useSelector((store) => store.theme.theme);
  const isDarkMode = useSelector((store) => store.theme.isDarkMode);
  const isPremium = useSelector((store) => store.premium_features.isPremium);
  const dispatch = useDispatch();

  const getExpenses = async () => {
    try {
      const response = await fetch('https://expense-tracker-2313d-default-rtdb.firebaseio.com/expenses.json');
      const data = await response.json();
      if (data) { 
        const allId = Object.keys(data);
        const allExpenses = Object.values(data).map((item, index) => ({ ...item, id: allId[index] }));
        dispatch(restoreExpense(allExpenses));
      } else {
        dispatch(resetExpense());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://expense-tracker-2313d-default-rtdb.firebaseio.com/expenses/${id}.json`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete expense.');
      getExpenses();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownload = () => {
    const csvContent = convertToCSV(expenses);
    const link = document.createElement('a');
    link.setAttribute('href', csvContent);
    link.setAttribute('download', 'expenses.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleActivatePremium = () => {
    if (expenses.reduce((total, expense) => total + expense.amount, 0) >= 10000) {
      dispatch(activatePremium());
      dispatch(darkMode());
    }
  };

  const handleToggleTheme = () => {
    if (isDarkMode) {
      dispatch(lightMode());
    } else {
      dispatch(darkMode());
    }
  };

  useEffect(() => {
    getExpenses();
  }, []);

  return (
    <section style={{ color: theme.color, backgroundColor: theme.background }}>
      <h3>Added Expenses:</h3>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            <span>{expense.amount} - {expense.description} ({expense.category})</span>
            <button onClick={() => onEditExpense(expense)}>Edit</button>
            <button onClick={() => handleDelete(expense.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={handleDownload}>Download CSV</button>
      <button onClick={handleActivatePremium}>Activate Premium</button>
      <button onClick={handleToggleTheme}>
        Switch to {isDarkMode ? 'Light' : 'Dark'} Theme
      </button>
    </section>
  );
};

export default ExpenseList;
