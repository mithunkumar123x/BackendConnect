import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { restoreExpense, resetExpense } from '../store/expenseSlice';

const ExpenseList = ({ onEditExpense }) => {
  const expenses = useSelector((store) => store.expenses.expenses);
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

  useEffect(() => {
    getExpenses();
  }, []);

  return (
    <section>
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
    </section>
  );
};

export default ExpenseList;
