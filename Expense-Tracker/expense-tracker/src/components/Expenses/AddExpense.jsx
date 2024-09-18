import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addExpense } from '../store/expenseSlice';
import { activatePremium, deactivatePremium } from '../store/premiumSlice';


const URL = 'https://expense-tracker-2313d-default-rtdb.firebaseio.com/expenses.json';

const AddExpense = ({ isEditing, currentExpense, onCancelEdit }) => {
  const [amount, setAmount] = useState(isEditing ? currentExpense.amount : '');
  const [description, setDescription] = useState(isEditing ? currentExpense.description : '');
  const [category, setCategory] = useState(isEditing ? currentExpense.category : 'Food');
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.expenses);

  const categories = ['Food', 'Petrol', 'Salary', 'Entertainment', 'Utilities', 'Other'];

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newExpense = { amount, description, category };

    try {
      let response;
      if (isEditing) {
        response = await fetch(`${URL}/${currentExpense.id}.json`, {
          method: 'PUT',
          body: JSON.stringify(newExpense),
          headers: { 'Content-Type': 'application/json' },
        });
      } else {
        response = await fetch(URL, {
          method: 'POST',
          body: JSON.stringify(newExpense),
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        newExpense.id = data.name;  // Set ID from Firebase
        dispatch(addExpense(newExpense));
      }

      if (!response.ok) throw new Error(isEditing ? 'Failed to update expense.' : 'Failed to add expense.');

      const updatedTotalAmount = expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0) + parseFloat(amount);
      if (updatedTotalAmount > 10000) {
        dispatch(activatePremium());
      } else {
        dispatch(deactivatePremium());
      }

      setAmount('');
      setDescription('');
      setCategory('Food');
      onCancelEdit();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className={classes.formSection}>
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
          <select id='category' value={category} onChange={(e) => setCategory(e.target.value)}>
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
    </section>
  );
};

export default AddExpense;
