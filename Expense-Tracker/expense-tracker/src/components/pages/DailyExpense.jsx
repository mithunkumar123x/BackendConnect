import { useState, useContext } from 'react';
import AuthContext from '../store/auth-context';
import classes from './DailyExpense.module.css';

export  const DailyExpenses = () => {
  const authCtx = useContext(AuthContext);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Food'); 
  const [expenses, setExpenses] = useState([]);

  const categories = ['Food', 'Petrol', 'Salary', 'Entertainment', 'Utilities', 'Other'];

  const handleSubmit = (event) => {
    event.preventDefault();
    const newExpense = { amount, description, category };
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
    setAmount('');
    setDescription('');
    setCategory('Food'); 
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
      
      <h3>Added Expenses:</h3>
      <ul className={classes.expenseList}>
        {expenses.map((expense, index) => (
          <li key={index}>
            <span>{expense.amount} - {expense.description} ({expense.category})</span>
          </li>
        ))}
      </ul>
    </section>
  );
};


