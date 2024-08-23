import React, { useState } from "react";

// Create the AuthContext with default values
const AuthContext = React.createContext({
   token: '', // Use a colon instead of an equals sign
   isLoggedIn: false,
   login: (token) => {},
   logout: () => {}
});

// Create the AuthProvider component
export const AuthContextProvider = (props) => {
   const [token, setToken] = useState(null);

   const userIsLoggedIn = !!token; // Convert token to boolean

   const loginHandler = (token) => {
       setToken(token);
   };

   const logoutHandler = () => {
       setToken(null);
   };

   const contextValue = {
       token: token,
       isLoggedIn: userIsLoggedIn,
       login: loginHandler,
       logout: logoutHandler,
   };

   return (
       <AuthContext.Provider value={contextValue}>
           {props.children}
       </AuthContext.Provider>
   );
};

export default AuthContext;
