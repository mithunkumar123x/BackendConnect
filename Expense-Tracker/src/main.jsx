import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
 // import App from './App.jsx'
import './index.css'
import {  createBrowserRouter,  RouterProvider  } from 'react-router-dom'
import { Home } from './components/Home/Home.jsx'
import { About } from './components/context/About/About.jsx'
import { AuthPage } from './components/pages/AuthPage.jsx'



const router = createBrowserRouter([
  {
    path: '/',
    element: '',
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "about",
        element: <About />
      },
      {
        path: "contact",
        element: <AuthPage />
      }
    ]
  } 
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <RouterProvider router={router} />
  </StrictMode>,
)
