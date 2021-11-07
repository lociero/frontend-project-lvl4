import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login.jsx';
import NotFoundPage from './NotFoundPage.jsx';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<div>main page</div>} />
      <Route path="login" element={<Login />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
