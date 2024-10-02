import { Navigate, useLocation } from "react-router-dom";

import { AuthContext } from "../providers/AuthProvider";
import { useContext } from "react";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) {
    return <progress className="progress w-56"></progress>;
  }

  return user ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location, replace: true }}></Navigate>
  );
};

export default PrivateRoute;
