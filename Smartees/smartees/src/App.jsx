
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import MainHeader from './components/MainHeader';
import Welcome from './pages/Welcome';
import Product from './pages/Product';
import AuthForm from './pages/Login';
import AuthContextProvider from './components/context/context';


const Layout = () => (
  <>
    <MainHeader />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: 'welcome', element: <Welcome /> },
      { path: 'product', element: <Product /> },
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
