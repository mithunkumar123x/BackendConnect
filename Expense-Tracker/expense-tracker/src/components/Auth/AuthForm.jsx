import  { useState, useRef, useContext } from 'react';
import classes from './AuthForm.module.css';
import AuthContext from '../store/auth-context';
import { useHistory } from 'react-router-dom';

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef(); 

  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    setError(null); 
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = isLogin ? null : confirmPasswordInputRef.current.value;

    if (!isLogin && enteredPassword !== enteredConfirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    setIsLoading(true);
    let url;
    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCqsq7UqyLZoMuNmuOxLnxY2z4wv5WYEaw';
    } else {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCqsq7UqyLZoMuNmuOxLnxY2z4wv5WYEaw';
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
          console.log('Authentication Success');
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = 'Authentication Failed!';
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        authCtx.login(data.idToken);
        history.replace('/');
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const handleForgotPassword = async () => {
    const enteredEmail = emailInputRef.current.value;
    if (!enteredEmail) {
      setError('Please enter your email address.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCqsq7UqyLZoMuNmuOxLnxY2z4wv5WYEaw`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requestType: 'PASSWORD_RESET',
          email: enteredEmail,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error.message || 'Failed to send password reset email.');
      }

      alert('Password reset link sent! Check your email to reset your password.');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={classes.auth}>
      <div className={classes.card}>
        <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor='email'>Your Email</label>
            <input type='email' id='email' required ref={emailInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor='password'>Your Password</label>
            <input
              type='password'
              id='password'
              required
              ref={passwordInputRef}
            />
          </div>
          {!isLogin && (
            <div className={classes.control}>
              <label htmlFor='confirm-password'>Confirm Password</label>
              <input
                type='password'
                id='confirm-password'
                required
                ref={confirmPasswordInputRef}
              />
            </div>
          )}
          {error && <p className={classes.error}>{error}</p>} 
          <div className={classes.actions}>
            {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
            {isLoading && <p>Sending request...</p>}
            <button
              type='button'
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              {isLogin ? 'Create new account' : 'Login with existing account'}
            </button>
            <button
              type='button'
              className={classes.forgotPassword}
              onClick={handleForgotPassword}
            >
              Forgot Password?
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AuthForm;
