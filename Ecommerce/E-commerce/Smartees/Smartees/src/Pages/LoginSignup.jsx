import AuthContext from '../Context/auth-context';
import './CSS/LoginSignup.css';
import { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Change here

export const LoginSignUp = () => {
  const navigate = useNavigate(); // Change here
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);
    let url;

    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB_OOBzh6TAgxkFhiKlfLtGHZkHcu9WJ6s';
    } else {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB_OOBzh6TAgxkFhiKlfLtGHZkHcu9WJ6s';
    }

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      setIsLoading(false);
      if (res.ok) {
        return res.json();
      } else {
        return res.json().then((data) => {
          let errorMessage = data.error.message || 'Authentication Failed';
          throw new Error(errorMessage);
        });
      }
    })
    .then((data) => {
      authCtx.login(data.idToken);
      navigate('/'); // Change here
    })
    .catch((error) => {
      setIsLoading(false);
      alert(error.message);
    });
  };

  const logoutHandler = () => {
    authCtx.logout();
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>

        <form onSubmit={submitHandler}>
          <div className="loginsignup-fields">
            {!isLogin && <input type="text" placeholder="Your Name" required />}
            <input type="email" placeholder="Email Address" required ref={emailInputRef} />
            <input type="password" placeholder="Password" required ref={passwordInputRef} />
          </div>
          <div className="loginsignup-agree">
            <input type="checkbox" id="agree" required />
            <p>By continuing, I agree to the terms of use & privacy policy</p>
          </div>
          {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoading && <p>Sending Request...</p>}
          <button type='button' onClick={switchAuthModeHandler}>
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>

          <p className="loginsignup-login">
            Already have an account? <span onClick={switchAuthModeHandler} style={{ cursor: 'pointer', color: 'blue' }}>Login here..</span>
          </p>
        </form>

        {authCtx.isLoggedIn && <button onClick={logoutHandler}>Logout</button>}
      </div>
    </div>
  );
};
