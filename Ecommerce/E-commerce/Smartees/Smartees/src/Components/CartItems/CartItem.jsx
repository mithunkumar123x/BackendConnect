import './CartItem.css';
import { ProductContext } from '../../Context/ProductContext';
import { useContext } from 'react';
import remove_icon from '../Assets/cart_cross_icon.png'; // Ensure this path is correct

const CartItem = () => {
    const { all_product, cartItem, removeFromCart } = useContext(ProductContext);

    // Calculate subtotal and total
    const subtotal = all_product.reduce((total, e) => {
        return total + (e.new_price * (cartItem[e.id] || 0));
    }, 0);

    const shippingFee = 0; // Assuming free shipping
    const totalAmount = subtotal + shippingFee;

    return (
        <div className='cartitems'>
            <div className='cartitems-format-main'>
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total Amount</p>
                <p>Remove</p>
            </div>
            <hr />
            {all_product.map((e) => {
                if (cartItem[e.id] > 0) {
                    return (
                        <div className='cartitems-format' key={e.id}>
                            <img src={e.image} alt={e.name} className='carticon-product-icon' />
                            <p>{e.name}</p>
                            <p>${e.new_price.toFixed(2)}</p>
                            <button className='cartitems-quantity'>{cartItem[e.id]}</button>
                            <p>${(e.new_price * cartItem[e.id]).toFixed(2)}</p>
                            <img 
                                src={remove_icon} 
                                onClick={() => removeFromCart(e.id)} // Pass the correct item ID
                                alt='Remove' 
                                className='remove-icon' 
                            />
                        </div>
                    );
                }
                return null; 
            })}
            <div className='cartitems-down'>
                <div className='cartitems-total'> 
                    <h1>Cart Total</h1>
                    <div>
                        <div className='cartitems-total-item'>
                            <p>Sub Total</p>
                            <p>${subtotal.toFixed(2)}</p>
                        </div>
                        <hr />
                        <div className='cartitems-total-item'>
                            <p>Shipping Fee</p>
                            <p>Free</p> 
                        </div>
                        <hr /> 
                        <div className='cartitems-total-item'>
                            <h3>Total Amount</h3>
                            <h3>${totalAmount.toFixed(2)}</h3>
                        </div>
                        <button>PROCEED TO CHECKOUT</button>
                    </div>
                    <div className='cartitems-promocode'>
                        <p>If you have a promo code, enter it here</p>
                        <div className='cartitems-promobox'>
                            <input type='text' />
                            <button>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
