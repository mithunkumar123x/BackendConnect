import { createContext, useState, useEffect, useContext } from "react";
import all_product from '../Components/Assets/all_product';
import AuthContext from './auth-context'; 

export const ProductContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < all_product.length; index++) {
        cart[index] = 0;
    }
    return cart;
}

const ProductContextProvider = (props) => {
    const [cartItem, setCartItem] = useState(getDefaultCart);
    const authCtx = useContext(AuthContext); 
    const userEmailId = authCtx.isLoggedIn ? authCtx.token : null; 
     
    const URL = 'https://crudcrud.com/api/38721d909f7d4a65a17307f265436c50'; 

    const addToCart = async (itemId) => {
        setCartItem((prev) => {
            const updatedCart = { ...prev, [itemId]: (prev[itemId] || 0) + 1 };
           
            fetch(`${URL}/cart/${userEmailId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productId: itemId, quantity: updatedCart[itemId] }),
            })
            .catch(error => console.error('Error adding to cart:', error)); 

            return updatedCart;
        });
    };

    const fetchCartItems = async () => {
        if (userEmailId) {
            const response = await fetch(`${URL}/cart/${userEmailId}`);
            if (!response.ok) {
                console.error('Failed to fetch cart items:', response.statusText);
                return;
            }
            const data = await response.json();
            const newCartItem = {};
            data.forEach(item => {
                newCartItem[item.productId] = item.quantity;
            });
            setCartItem(newCartItem);
        }
    };

    const removeFromCart = async (itemId) => {
        setCartItem((prev) => {
            const newQuantity = prev[itemId] > 0 ? prev[itemId] - 1 : 0;
            const updatedCart = { ...prev, [itemId]: newQuantity };

           
            fetch(`${URL}/cart/${userEmailId}/${itemId}`, {
                method: 'DELETE',
            })
            .catch(error => console.error('Error removing from cart:', error));

            return updatedCart;
        });
    };

    useEffect(() => {
        fetchCartItems();
    }, [userEmailId]);

    const contextValue = { all_product, cartItem, addToCart, removeFromCart };

    return (
        <ProductContext.Provider value={contextValue}>
            {props.children}
        </ProductContext.Provider>
    );
}

export default ProductContextProvider;
