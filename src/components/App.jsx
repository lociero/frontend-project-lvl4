import React, { useState } from 'react';
import {
  BrowserRouter, Route, Routes, Navigate,
} from 'react-router-dom';
import { authContext } from '../contexts/auth.js';
import Login from './Login.jsx';
import NotFoundPage from './NotFoundPage.jsx';

const App = () => {
  const authToken = localStorage.getItem('authToken');
  const [token, setToken] = useState(authToken);
  const updateToken = (newToken) => {
    localStorage.setItem('authToken', newToken);
    setToken(newToken);
  };

  return (
    <authContext.Provider value={{ token, updateToken }}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={token ? <div>main page</div> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </authContext.Provider>
  );
};

export default App;
