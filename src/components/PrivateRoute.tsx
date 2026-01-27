import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, roles }: { children: JSX.Element, roles?: string[] }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role"); // "student" or "instructor"

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(userRole!)) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}
