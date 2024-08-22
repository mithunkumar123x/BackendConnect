import Navbar from './Components/Navbar/Navbar'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Product from './Pages/Product'
import { ProductCategory } from './Pages/ProductCategory'
import { Shop } from './Pages/Shop'
import { Cart } from './Pages/Cart'
import { LoginSignUp } from './Pages/LoginSignup'
import { Footer } from './Components/Footer/Footer'
import men_banner from './Components/Assets/banner_mens.png';
import women_banner from './Components/Assets/banner_women.png'
import kid_banner from './Components/Assets/banner_kids.png'


function App() {


  return (
   <div>
     <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Product />} />
          <Route path='/mens' element= { <ProductCategory banner = {men_banner} category="men" />} />
          <Route path='/womens' element = {<ProductCategory banner={women_banner} category="womens" />} />
          <Route path='/kids' element = { <ProductCategory banner={kid_banner} category= "kid" />} />
          <Route path='/product' element={<Shop />}>
              <Route path=':ProductId' element={<Shop />} />
          </Route>
          <Route path="/cart" element= {<Cart />} />
          <Route path='/login' element = {<LoginSignUp />} /> 
        </Routes>
        <Footer />


     </BrowserRouter>
   </div>
  )
}

export default App
