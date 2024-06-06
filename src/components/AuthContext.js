import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(null);

  // Function to handle login
  const login = (userData, token) => {
    // Store user data and token in session storage or local storage
    sessionStorage.setItem('userData', JSON.stringify(userData));
    sessionStorage.setItem('token', token);
    // Update state to indicate user is logged in
    setIsLoggedIn(true);
    // Set user data and token in state
    setUserData(userData);
    setToken(token);
  };

  // Function to handle logout
  const logout = () => {
    // Clear user data and token from session storage or local storage
    sessionStorage.removeItem('userData');
    sessionStorage.removeItem('token');
    // Update state to indicate user is logged out
    setIsLoggedIn(false);
    // Clear user data and token from state
    setUserData(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userData, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
