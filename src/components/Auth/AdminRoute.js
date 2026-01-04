import { Navigate } from "react-router-dom";
import { getToken, getUserRole } from "../../utils/auth";

export default function AdminRoute({ children }) {
  if (!getToken()) return <Navigate to="/login" replace />;
  if (getUserRole() !== "Admin") return <Navigate to="/dashboard" replace />;
  return children;
}
