import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement, incrementBy5 } from '../features/counter/counterSlice';

const Counter = () => {
    const dispatch = useDispatch();
    const counter = useSelector((state) => state.counter.value);

    return (
        <div>
            <h1>Counter: {counter}</h1>
            <button onClick={() => dispatch(increment())}>Increment</button>
            <button onClick={() => dispatch(decrement())}>Decrement</button>
            <button onClick={ () => dispatch(incrementBy5())}>Increase By 5</button>
        </div>
    );
};

export default Counter;
