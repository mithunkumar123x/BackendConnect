
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import ProductContextProvider from './Context/ProductContext.jsx'
// import './index.css'

createRoot(document.getElementById('root')).render(
 <ProductContextProvider>
    <App />
 </ProductContextProvider>,
)
