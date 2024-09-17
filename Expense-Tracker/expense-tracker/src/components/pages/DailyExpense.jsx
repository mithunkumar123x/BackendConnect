import { useState, useEffect } from 'react';
import classes from './DailyExpense.module.css';

const URL = 'https://expense-tracker-2313d-default-rtdb.firebaseio.com/expenses.json';

export const DailyExpenses = () => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Food');
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentExpenseId, setCurrentExpenseId] = useState(null);
  const [showPremiumButton, setShowPremiumButton] = useState(false);

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
      let totalAmount = 0;
      for (const key in data) {
        const expense = { id: key, ...data[key] };
        expenseList.push(expense);
        totalAmount += parseFloat(expense.amount);
      }
      setExpenses(expenseList);
      setShowPremiumButton(totalAmount > 10000);
    };

    fetchExpenses();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newExpense = { amount, description, category };

    if (isEditing) {
      const response = await fetch(`https://expense-tracker-2313d-default-rtdb.firebaseio.com/expenses/${currentExpenseId}.json`, {
        method: 'PUT',
        body: JSON.stringify(newExpense),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setExpenses((prevExpenses) =>
          prevExpenses.map((expense) =>
            expense.id === currentExpenseId ? { id: currentExpenseId, ...newExpense } : expense
          )
        );
        console.log("Expense successfully updated");
      } else {
        setError("Failed to update expense.");
      }
    } else {
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
        console.log("Expense successfully added");
      } else {
        setError("Failed to add expense.");
      }
    }

   
    const updatedTotalAmount = expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0) + parseFloat(amount);
    setShowPremiumButton(updatedTotalAmount > 10000);

    setAmount('');
    setDescription('');
    setCategory('Food');
    setIsEditing(false);
    setCurrentExpenseId(null);
  };

  const handleDelete = async (id) => {
    const response = await fetch(`https://expense-tracker-2313d-default-rtdb.firebaseio.com/expenses/${id}.json`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
      console.log("Expense successfully deleted");
    } else {
      setError("Failed to delete expense.");
    }

  
    const updatedTotalAmount = expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
    setShowPremiumButton(updatedTotalAmount > 10000);
  };

  const handleEdit = (expense) => {
    setAmount(expense.amount);
    setDescription(expense.description);
    setCategory(expense.category);
    setIsEditing(true);
    setCurrentExpenseId(expense.id);
  };

  const handleActivatePremium = () => {
    console.log('Activate Premium button clicked');
    
  };

  return (
    <section className={classes.expenses}>
      <h2>{isEditing ? 'Edit Expense' : 'Add Daily Expenses'}</h2>
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
        <button type='submit'>{isEditing ? 'Update Expense' : 'Add Expense'}</button>
      </form>

      {error && <p className={classes.error}>{error}</p>}

      {showPremiumButton && (
        <button onClick={handleActivatePremium} className={classes.activatePremiumButton}>
          Activate Premium
        </button>
      )}

      <h3>Added Expenses:</h3>
      <ul className={classes.expenseList}>
        {expenses.map((expense) => (
          <li key={expense.id}>
            <span>{expense.amount} - {expense.description} ({expense.category})</span>
            <button onClick={() => handleEdit(expense)}>Edit</button>
            <button onClick={() => handleDelete(expense.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </section>
  );
};
