import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const jwtToken = Cookies.get('jwt_token');

  return (
    <Route
      {...rest}
      element={jwtToken ? <Component /> : <Navigate to="/login" replace />}
    />
  );
};

export default ProtectedRoute;
