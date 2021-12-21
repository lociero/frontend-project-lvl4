/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../contexts/auth';

const PrivateRoute = ({ component: Component, ...props }) => {
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token]);

  return <Component {...props} />;
};

export default PrivateRoute;
