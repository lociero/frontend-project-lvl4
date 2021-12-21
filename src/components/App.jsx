import React from 'react';
import {
  BrowserRouter, Route, Routes,
} from 'react-router-dom';
import { Provider } from 'react-redux';

import AuthProvider from '../providers/AuthProvider.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import store from '../store/store.js';
import Login from './Login.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import Chat from './Chat.jsx';

const App = () => (
  <Provider store={store}>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrivateRoute component={Chat} />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </Provider>
);
export default App;
