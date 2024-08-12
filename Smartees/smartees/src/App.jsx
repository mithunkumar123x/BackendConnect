import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom';
import MainHeader from './components/MainHeader';
import Welcome from './pages/Welcome';
import Product from './pages/Product';
import AuthForm from './pages/Login';
import AuthContextProvider, { AuthContext } from './components/context/context';
import { useContext } from 'react';

const Layout = () => (
  <>
    <MainHeader />
    <Outlet />
  </>
);

const ProtectedRoute = ({ children }) => {
  const authCtx = useContext(AuthContext);

  if (!authCtx.isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: 'welcome', element: <Welcome /> },
      { 
        path: 'product', 
        element: (
          <ProtectedRoute>
            <Product />
          </ProtectedRoute>
        ) 
      },
      { path: 'login', element: <AuthForm /> }
    ],
  },
]);

function App() {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}

export default App;
