import { useState, useRef, useContext } from 'react';
import { AuthContext } from '../components/context/context';

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);

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
            let errorMessage = 'Authentication failed!';
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
        authCtx.login(data.idToken); 
      })
      .catch((error) => {
        alert(error.message); 
      });
  };

  return (
    <section className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Your Email
          </label>
          <input
            type="email"
            id="email"
            required
            ref={emailInputRef}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Your Password
          </label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
          />
        </div>
        <div className="flex flex-col items-center">
          {!isLoading && (
            <button
              className="w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700 transition duration-200"
            >
              {isLogin ? 'Login' : 'Create Account'}
            </button>
          )}
          {isLoading && <p className="text-gray-700">Sending Request...</p>}
          <button
            type="button"
            onClick={switchAuthModeHandler}
            className="mt-4 text-orange-600 hover:underline focus:outline-none"
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
