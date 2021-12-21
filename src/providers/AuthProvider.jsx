import React, { useState } from 'react';
import { authContext } from '../contexts/auth.js';

const AuthProvider = ({ children }) => {
  const authToken = localStorage.getItem('authToken');
  const [token, setToken] = useState(authToken);
  const updateToken = (newToken) => {
    localStorage.setItem('authToken', newToken);
    setToken(newToken);
  };

  return <authContext.Provider value={{ token, updateToken }}>{children}</authContext.Provider>;
};

export default AuthProvider;
