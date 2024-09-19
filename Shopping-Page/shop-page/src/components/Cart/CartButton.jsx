import { uiActions } from "../../Store/UI-Slice"
import { useDispatch , useSelector } from 'react-redux';
import classes from './CartButton.module.css';

 const CartButton = (props) => {
   
    const dispatch = useDispatch();
    const cartQuantity = useSelector(state => state.cart.totalQuantity);

   const toggleCartHandler = () => {
    dispatch(uiActions.toogle())
   } 
    return (
        <button className={classes.button} onClick={toggleCartHandler}>
            <span>MyCart</span>
            <span className={classes.badge}>{cartQuantity}</span>
        </button>
    )
};

export default CartButton;