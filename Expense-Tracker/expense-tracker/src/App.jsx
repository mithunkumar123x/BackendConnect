import { Switch, Route } from 'react-router-dom';

import './App.css';
import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './components/pages/AuthPage';
import HomePage from './components/pages/HomePage';
import { DailyExpenses } from './components/pages/DailyExpense';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        <Route path='/auth'>
          <AuthPage />
        </Route>
        <Route path='/profile'>
          <UserProfile />
        </Route>
        <Route path='/expense'>
          <DailyExpenses />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;