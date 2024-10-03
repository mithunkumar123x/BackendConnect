import { render, fireEvent, screen } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import ExpenseList from './ExpenseList';
import { restoreExpense, resetExpense } from '../store/expenseSlice';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('ExpenseList Component', () => {
  beforeEach(() => {
    useDispatch.mockClear();
    useSelector.mockClear();
  });

  test('calls getExpenses on mount', async () => {
    const getExpenses = jest.fn();
    render(<ExpenseList />);
    expect(getExpenses).toHaveBeenCalled();
  });

  test('dispatches restoreExpense with fetched data', async () => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ id1: { amount: 100, description: 'Test', category: 'Food' } }),
      })
    );
    await getExpenses();
    expect(dispatch).toHaveBeenCalledWith(restoreExpense([{ amount: 100, description: 'Test', category: 'Food', id: 'id1' }]));
  });

  test('dispatches resetExpense when no data is fetched', async () => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(null),
      })
    );
    await getExpenses();
    expect(dispatch).toHaveBeenCalledWith(resetExpense());
  });

  test('calls getExpenses after successful deletion', async () => {
    const getExpenses = jest.fn();
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
      })
    );
    await handleDelete('id1');
    expect(getExpenses).toHaveBeenCalled();
  });

  test('logs error on failed deletion', async () => {
    console.log = jest.fn();
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
      })
    );
    await handleDelete('id1');
    expect(console.log).toHaveBeenCalledWith(new Error('Failed to delete expense.'));
  });

  test('renders expenses correctly', () => {
    useSelector.mockReturnValue([{ id: 'id1', amount: 100, description: 'Test', category: 'Food' }]);
    const { getByText } = render(<ExpenseList />);
    expect(getByText('100 - Test (Food)')).toBeInTheDocument();
  });

  test('calls onEditExpense with correct expense', () => {
    const onEditExpense = jest.fn();
    useSelector.mockReturnValue([{ id: 'id1', amount: 100, description: 'Test', category: 'Food' }]);
    const { getByText } = render(<ExpenseList onEditExpense={onEditExpense} />);
    fireEvent.click(getByText('Edit'));
    expect(onEditExpense).toHaveBeenCalledWith({ id: 'id1', amount: 100, description: 'Test', category: 'Food' });
  });

  test('calls handleDelete with correct id', () => {
    useSelector.mockReturnValue([{ id: 'id1', amount: 100, description: 'Test', category: 'Food' }]);
    const { getByText } = render(<ExpenseList />);
    fireEvent.click(getByText('Delete'));
    expect(handleDelete).toHaveBeenCalledWith('id1');
  });

  test('handles fetch error in getExpenses', async () => {
    console.log = jest.fn();
    global.fetch = jest.fn(() => Promise.reject('Fetch error'));
    await getExpenses();
    expect(console.log).toHaveBeenCalledWith('Fetch error');
  });

  test('matches snapshot', () => {
    useSelector.mockReturnValue([{ id: 'id1', amount: 100, description: 'Test', category: 'Food' }]);
    const { asFragment } = render(<ExpenseList />);
    expect(asFragment()).toMatchSnapshot();
  });
});
