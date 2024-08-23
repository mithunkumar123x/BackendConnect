
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import ProductContextProvider from './Context/ProductContext.jsx'
import { AuthContextProvider } from './Context/auth-context.jsx'
// import './index.css'

createRoot(document.getElementById('root')).render(
<AuthContextProvider>
<ProductContextProvider>
    <App />
 </ProductContextProvider>
</AuthContextProvider>,
)
