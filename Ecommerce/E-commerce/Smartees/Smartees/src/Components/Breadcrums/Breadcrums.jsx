import './Breadcrums.css';
import arrow_icon from '../Assets/breadcrum_arrow.png';
import { Link } from 'react-router-dom';

export const Breadcrums = (props) => {
    const { product } = props;

    return (
        <nav className="breadcrum" aria-label="Breadcrumb">
            <span className="breadcrum-item">
                <Link to="/">HOME</Link>
            </span>
            <img src={arrow_icon} alt='arrow' className="breadcrum-arrow" />
            <span className="breadcrum-item">
                <Link to="/shop">SHOP</Link>
            </span>
            <img src={arrow_icon} alt='arrow' className="breadcrum-arrow" />
            <span className="breadcrum-item">
                <Link to={`/category/${product.category}`}>{product.category}</Link>
            </span>
            <img src={arrow_icon} alt='arrow' className="breadcrum-arrow" />
            <span className="breadcrum-item">
                <Link to={`/product/${product.id}`}>{product.name}</Link>
            </span>
        </nav>
    );
};
