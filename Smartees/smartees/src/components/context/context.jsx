import React, { useState, useEffect } from 'react';

export const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const [tokenExpiryTime, setTokenExpiryTime] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedExpiryTime = localStorage.getItem('expiryTime');

    if (storedToken && storedExpiryTime) {
      const now = new Date().getTime();
      if (now >= storedExpiryTime) {
        logoutHandler();
      } else {
        setToken(storedToken);
        setTokenExpiryTime(storedExpiryTime);
      }
    }
  }, []);

  useEffect(() => {
    if (token && tokenExpiryTime) {
      const remainingTime = tokenExpiryTime - new Date().getTime();
      const logoutTimer = setTimeout(logoutHandler, remainingTime);

      return () => {
        clearTimeout(logoutTimer);
      };
    }
  }, [token, tokenExpiryTime]);

  const loginHandler = (token) => {
    const expiryTime = new Date().getTime() + 5 * 60 * 1000;
    setToken(token);
    setTokenExpiryTime(expiryTime);

    localStorage.setItem('token', token);
    localStorage.setItem('expiryTime', expiryTime);

    const logoutTimer = setTimeout(logoutHandler, 5 * 60 * 1000);
  };

  const logoutHandler = () => {
    setToken(null);
    setTokenExpiryTime(null);
    localStorage.removeItem('token');
    localStorage.removeItem('expiryTime');
  };

  const contextValue = {
    token: token,
    isLoggedIn: !!token,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
