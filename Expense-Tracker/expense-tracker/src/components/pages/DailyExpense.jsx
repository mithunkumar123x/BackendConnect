import { useState, useContext, useEffect } from 'react';
import AuthContext from '../store/auth-context';
import classes from './DailyExpense.module.css';

const URL = 'https://expense-tracker-2313d-default-rtdb.firebaseio.com//expenses.json';

export const DailyExpenses = () => {
  const authCtx = useContext(AuthContext);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Food'); 
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null); 

  const categories = ['Food', 'Petrol', 'Salary', 'Entertainment', 'Utilities', 'Other'];

 
  useEffect(() => {
    const fetchExpenses = async () => {
      const response = await fetch(URL);
      if (!response.ok) {
        setError("Failed to fetch expenses.");
        return;
      }
      const data = await response.json();
      const expenseList = [];
      for (const key in data) {
        expenseList.push({ id: key, ...data[key] });
      }
      setExpenses(expenseList);
    };

    fetchExpenses();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newExpense = { amount, description, category };

    // Store expense in Firebase
    const response = await fetch(URL, {
      method: 'POST',
      body: JSON.stringify(newExpense),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const responseData = await response.json();
      setExpenses((prevExpenses) => [...prevExpenses, { id: responseData.name, ...newExpense }]);
      setAmount('');
      setDescription('');
      setCategory('Food'); 
      setError(null); 
    } else {
      setError("Failed to add expense."); 
    }
  };


  if (!authCtx.isLoggedIn) {
    return null;
  }

  return (
    <section className={classes.expenses}>
      <h2>Add Daily Expenses</h2>
      <form onSubmit={handleSubmit} className={classes.form}>
        <div className={classes.control}>
          <label htmlFor='amount'>Amount Spent</label>
          <input
            type='number'
            id='amount'
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor='description'>Description</label>
          <input
            type='text'
            id='description'
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor='category'>Category</label>
          <select
            id='category'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <button type='submit'>Add Expense</button>
      </form>
      
      {error && <p className={classes.error}>{error}</p>} 

      <h3>Added Expenses:</h3>
      <ul className={classes.expenseList}>
        {expenses.map((expense) => (
          <li key={expense.id}>
            <span>{expense.amount} - {expense.description} ({expense.category})</span>
          </li>
        ))}
      </ul>
    </section>
  );
};
