import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Redirigir al login si no está autenticado
    return <Navigate to="/" />;
  }

  // Renderizar la ruta si está autenticado
  return children;
};

export default ProtectedRoute;
