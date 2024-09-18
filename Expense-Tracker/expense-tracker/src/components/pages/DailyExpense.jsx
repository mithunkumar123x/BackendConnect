import { useEffect , useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddExpense from '../Expenses/AddExpense';
import ExpenseList from '../Expenses/ExpenseList';
import { restoreExpense, resetExpense } from '../store/expenseSlice';


const URL = 'https://expense-tracker-2313d-default-rtdb.firebaseio.com/expenses.json';

const DailyExpenses = () => {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.expenses);
  const [isEditing, setIsEditing] = useState(false);
  const [currentExpense, setCurrentExpense] = useState(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch(URL);
        if (!response.ok) throw new Error('Failed to fetch expenses.');
        const data = await response.json();
        const expenseList = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value,
        }));
        dispatch(restoreExpense(expenseList));
      } catch (err) {
        console.error(err.message);
        dispatch(resetExpense()); // Optional: reset expenses on fetch error
      }
    };

    fetchExpenses();
  }, [dispatch]);

  const handleAddExpense = (newExpense) => {
    dispatch(addExpense(newExpense)); // You might want to handle adding expenses differently
  };

  const handleEditExpense = (expense) => {
    setIsEditing(true);
    setCurrentExpense(expense);
  };

  const handleDeleteExpense = (id) => {
    fetch(`https://expense-tracker-2313d-default-rtdb.firebaseio.com/expenses/${id}.json`, {
      method: 'DELETE',
    })
      .then(() => {
        dispatch(restoreExpense(expenses.filter((expense) => expense.id !== id)));
      })
      .catch((err) => console.error(err.message));
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setCurrentExpense(null);
  };

  return (
    <section>
      <AddExpense
        onAddExpense={handleAddExpense}
        isEditing={isEditing}
        currentExpense={currentExpense}
        onCancelEdit={handleCancelEdit}
      />
      <ExpenseList
        expenses={expenses}
        onEditExpense={handleEditExpense}
        onDeleteExpense={handleDeleteExpense}
      />
    </section>
  );
};

export default DailyExpenses;
