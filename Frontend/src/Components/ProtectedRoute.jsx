/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Navigate } from "react-router";
import Cookie from "js-cookie";
const ProtectedRoute = ({ children }) => {
  const jwt = Cookie.get("jwt");
  if (!jwt) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
