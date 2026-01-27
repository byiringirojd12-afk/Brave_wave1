import { Navigate } from "react-router-dom";

export default function RoleRoute({
  children,
  role,
}: {
  children: JSX.Element;
  role: string;
}) {
  const userRole = localStorage.getItem("userRole");
  if (userRole !== role) return <Navigate to="/" />;
  return children;
}
