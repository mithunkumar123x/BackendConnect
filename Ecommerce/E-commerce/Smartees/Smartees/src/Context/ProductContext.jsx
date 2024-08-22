import { createContext,useState} from "react";
import all_product from '../Components/Assets/all_product';

export const ProductContext = createContext(null);
  
const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < all_product.length; index++) {
        cart[index] = 0;
    }
    return cart;
}

const ProductContextProvider = (props) => {
      const [cartItem,setCartItem] = useState(getDefaultCart)
   
      const addToCart = (itemId) => {
        setCartItem((prev) => ({...prev, [itemId]: prev[itemId]+1}))
      }
     
      const removeFromCart = (itemId) => {
        setCartItem((prev) => {
            const newQuantity = prev[itemId] > 0 ? prev[itemId] - 1 : 0; 
            return { ...prev, [itemId]: newQuantity };
        });
    };


      const contextValue = {all_product , cartItem, addToCart,removeFromCart};


    return (
        <ProductContext.Provider value={contextValue}>
            {props.children}
        </ProductContext.Provider>
    )


}

export default ProductContextProvider;