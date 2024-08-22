import './Navbar.css';
import { useState, useContext } from "react";
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { ProductContext } from '../../Context/ProductContext'; 

const Navbar = () => {
    const [menu, setMenu] = useState("product");
    const { cartItem } = useContext(ProductContext); 

  
    const totalItems = Object.values(cartItem).reduce((total, quantity) => total + quantity, 0);

    return (
        <div className='navbar'>
            <div className='nav-logo'>
                <img src={logo} alt="Smartees Logo" />
                <p>Smartees</p>
            </div>
            <ul className="nav-menu">
                <li onClick={() => setMenu("product")}>
                    <Link to='/' className={menu === "product" ? "active" : ""}>Product</Link>
                </li>
                <li onClick={() => setMenu("men")}>
                    <Link to='/mens' className={menu === "men" ? "active" : ""}>Men</Link>
                </li>
                <li onClick={() => setMenu("women")}>
                    <Link to='/womens' className={menu === "women" ? "active" : ""}>Womens</Link>
                </li>
                <li onClick={() => setMenu("kids")}>
                    <Link to='/kids' className={menu === "kids" ? "active" : ""}>Kids</Link>
                </li>
            </ul>
            <div className="nav-login-cart">
                <Link to='/login'>
                    <button>Login</button>
                </Link>
                <Link to='/cart'>
                    <img src={cart_icon} alt="Cart" />
                </Link>
                <div className="nav-cart-count">{totalItems}</div> 
            </div>
        </div>
    );
}

export default Navbar;
