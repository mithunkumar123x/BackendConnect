import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ExpenseList from './ExpenseList';
import { restoreExpense, resetExpense } from '../store/expenseSlice';

const mockStore = configureStore([]);
const initialState = {
  expenses: {
    expenses: [
      { id: '1', amount: '100', description: 'Groceries', category: 'Food' },
      { id: '2', amount: '50', description: 'Fuel', category: 'Petrol' },
    ],
  },
};

const renderWithProviders = (ui, { store = mockStore(initialState) } = {}) => {
  return render(<Provider store={store}>{ui}</Provider>);
};

describe('ExpenseList Component', () => {
  test('renders ExpenseList component', () => {
    renderWithProviders(<ExpenseList />);
    expect(screen.getByText(/added expenses:/i)).toBeInTheDocument();
  });

  test('displays list of expenses', () => {
    renderWithProviders(<ExpenseList />);
    expect(screen.getByText(/100 - groceries \(food\)/i)).toBeInTheDocument();
    expect(screen.getByText(/50 - fuel \(petrol\)/i)).toBeInTheDocument();
  });

  test('calls onEditExpense when edit button is clicked', () => {
    const onEditExpense = jest.fn();
    renderWithProviders(<ExpenseList onEditExpense={onEditExpense} />);
    fireEvent.click(screen.getAllByText(/edit/i)[0]);
    expect(onEditExpense).toHaveBeenCalledWith({ id: '1', amount: '100', description: 'Groceries', category: 'Food' });
  });

  test('deletes an expense when delete button is clicked', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    );

    renderWithProviders(<ExpenseList />);
    fireEvent.click(screen.getAllByText(/delete/i)[0]);
    expect(await screen.findByText(/failed to delete expense/i)).not.toBeInTheDocument();
  });

  test('fetches and restores expenses on mount', async () => {
    const store = mockStore(initialState);
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          '1': { amount: '100', description: 'Groceries', category: 'Food' },
          '2': { amount: '50', description: 'Fuel', category: 'Petrol' },
        }),
      })
    );

    renderWithProviders(<ExpenseList />, { store });
    expect(store.getActions()).toContainEqual(restoreExpense([
      { id: '1', amount: '100', description: 'Groceries', category: 'Food' },
      { id: '2', amount: '50', description: 'Fuel', category: 'Petrol' },
    ]));
  });

  test('resets expenses if no data is fetched', async () => {
    const store = mockStore(initialState);
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(null),
      })
    );

    renderWithProviders(<ExpenseList />, { store });
    expect(store.getActions()).toContainEqual(resetExpense());
  });

  test('handles fetch error gracefully', async () => {
    global.fetch = jest.fn(() => Promise.reject('API is down'));

    renderWithProviders(<ExpenseList />);
    expect(await screen.findByText(/failed to fetch expenses/i)).toBeInTheDocument();
  });

  test('displays error message on failed delete', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({}),
      })
    );

    renderWithProviders(<ExpenseList />);
    fireEvent.click(screen.getAllByText(/delete/i)[0]);
    expect(await screen.findByText(/failed to delete expense/i)).toBeInTheDocument();
  });

  test('renders empty list message when no expenses', () => {
    const emptyState = {
      expenses: {
        expenses: [],
      },
    };
    renderWithProviders(<ExpenseList />, { store: mockStore(emptyState) });
    expect(screen.getByText(/no expenses added yet/i)).toBeInTheDocument();
  });

  test('calls getExpenses on mount', () => {
    const getExpenses = jest.fn();
    renderWithProviders(<ExpenseList />);
    expect(getExpenses).toHaveBeenCalled();
  });
});
