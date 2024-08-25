import { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import AuthContext from '../context/AuthContext';

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate(); // Initialize useNavigate

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    let enteredConfirmPassword = confirmPasswordInputRef.current?.value;
    if (!isLogin) {
      if (enteredPassword !== enteredConfirmPassword) {
        alert('Passwords do not match!');
        return;
      }
    }

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
      if (!isLogin) {
        console.log('User has successfully signed up.');
      }
      navigate('/'); 
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
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">{isLogin ? 'Login' : 'Sign Up'}</h1>

        <form onSubmit={submitHandler} className="space-y-6">
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email Address"
              required
              ref={emailInputRef}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="password"
              placeholder="Password"
              required
              ref={passwordInputRef}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {!isLogin && (
              <input
                type="password"
                placeholder="Confirm Password"
                required
                ref={confirmPasswordInputRef}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            )}
          </div>
          
          <div>
            {!isLoading && (
              <button
                type="submit"
                className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {isLogin ? 'Login' : 'Create Account'}
              </button>
            )}
            {isLoading && <p className="text-center text-gray-600">Sending Request...</p>}
          </div>
          <button
            type="button"
            onClick={switchAuthModeHandler}
            className="w-full text-center text-indigo-600 hover:underline mt-4"
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
          {isLogin && (
            <p className="text-center mt-4">
              Already have an account?{' '}
              <span
                onClick={switchAuthModeHandler}
                className="text-indigo-600 cursor-pointer hover:underline"
              >
               Login here
              </span>
            </p>
          )}
        </form>

        {authCtx.isLoggedIn && (
          <button
            onClick={logoutHandler}
            className="w-full mt-4 text-center text-red-600 hover:underline"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};
