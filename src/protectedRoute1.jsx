// ProtectedRoute.jsx
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../src/hooks/useAuth";

const ProtectedRoute = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  // If no access token exists, redirect to login
  if (!auth?.accessToken) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }
  console.log("ProtectedRoute auth:", auth);

  // Check if the user has one of the allowed roles
  const roleMatch = auth?.roles?.find(role => allowedRoles?.includes(role));
  return roleMatch ? <Outlet /> : <Navigate to="/unauthorized" state={{ from: location }} replace />;
};

export default ProtectedRoute;
