import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

interface PrivateRouteProps {
  element: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
