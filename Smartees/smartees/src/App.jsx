
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import MainHeader from './components/MainHeader';
import Welcome from './pages/Welcome';
import Product from './pages/Product';

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
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
