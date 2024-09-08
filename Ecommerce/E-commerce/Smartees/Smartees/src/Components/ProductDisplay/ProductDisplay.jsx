import './ProductDisplay.css';
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';
import { useContext } from 'react';
import { ProductContext } from '../../Context/ProductContext';

export const ProductDisplay = (props) => {
     
    const {product} = props;
    const { addToCart}= useContext(ProductContext)
   
    return (
        <div className='productdisplay'>
            <div className='productdisplay-left'>
               
                <div className='productdisplay-img'>
                    <img className='product-display-main-img' src={product.image} alt='main product' />
                </div>
            </div>
            <div className='productdisplay-right'>
                <h1>{product.name}</h1>
                <div className='productdisplay-rating'>
                    {[...Array(4)].map((_, index) => (
                        <img key={index} src={star_icon} alt='star' />
                    ))}
                    <img src={star_dull_icon} alt='dull star' />
                    <p>{122}</p>
                </div>
                <div className='productdisplay-right-prices'>
                    <div className='productdisplay-right-price-old'>
                        ${product.old_price}
                    </div>
                    <div className='productdisplay-right-price-new'>
                        ${product.new_price}
                    </div>
                </div>
                <div className='productdisplay-right-description'>
                    A lightweight, usually knitted, pullover shirt,
                     close-fitting with a round neckline and short sleeves,
                      worn as an undershirt or outer.
                </div>
                <div className='productdisplay-right-size'>
                    <h1>Select Size</h1>
                    <div className='productdisplay-right-size-options'>
                        {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                            <div key={size} className='size-option'>{size}</div>
                        ))}
                    </div>
                    <div className='productdisplay-img-list'>
                    {Array(4).fill(<img src={product.image} alt='product' />)}
                </div>
                </div>
                <button className='add-to-cart-button' onClick={() => {addToCart(product.id)}}>ADD TO CART</button>
                <p className='productdisplay-right-category'><span>Category: </span> Women, T-Shirt, Crop Top</p>
                <p className='productdisplay-right-category'><span>Tags: </span> Modern, Latest</p>
            </div>
        </div>
    );
};
