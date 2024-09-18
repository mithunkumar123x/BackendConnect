import { uiActions } from "../../Store/UI-Slice"
import { useDispatch } from 'react-redux';
import classes from './CartButton.module.css';

 const CartButton = (props) => {
   
    const dispatch = useDispatch();

   const toggleCartHandler = () => {
    dispatch(uiActions.toogle())
   } 
    return (
        <button className={classes.button} onClick={toggleCartHandler}>
            <span>MyCart</span>
            <span className={classes.badge}>1</span>
        </button>
    )
};

export default CartButton;