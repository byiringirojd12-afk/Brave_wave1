import { Navigate } from "react-router-dom";

// RoleRoute component to protect the route based on user role
const RoleRoute = ({ children, allowedRoles }: { children: JSX.Element, allowedRoles: string[] }) => {
  const userRole = localStorage.getItem("role");

  if (!userRole || !allowedRoles.includes(userRole)) {
    // Redirect to home if the user doesn't have the required role
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RoleRoute;