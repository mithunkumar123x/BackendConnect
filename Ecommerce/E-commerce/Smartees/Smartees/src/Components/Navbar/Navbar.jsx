import './Navbar.css';
import { useState, useContext } from "react";
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { ProductContext } from '../../Context/ProductContext'; 
import AuthContext from '../../Context/auth-context';

const Navbar = () => {
    const [menu, setMenu] = useState("product");
    const { cartItem } = useContext(ProductContext);
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;
    const navigate = useNavigate(); 

    const totalItems = Object.values(cartItem).reduce((total, quantity) => total + quantity, 0);

    const handleLoginLogout = () => {
        if (isLoggedIn) {
            authCtx.logout(); 
            navigate('/'); 
        } else {
            navigate('/login'); 
        }
    };

    return (
        <div className='navbar'>
            <div className='nav-logo'>
                <img src={logo} alt="Smartees Logo" />
                <p>Smartees</p>
            </div>
            {isLoggedIn &&
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
            </ul> }
            <div className="nav-login-cart">
                <button onClick={handleLoginLogout}>
                    {isLoggedIn ? 'Logout' : 'Login'}
                </button>
              {isLoggedIn &&  <Link to='/cart'>
                    <img src={cart_icon} alt="Cart" />
                </Link> }
                <div className="nav-cart-count">{totalItems}</div> 
            </div>
        </div>
    );
}

export default Navbar;
