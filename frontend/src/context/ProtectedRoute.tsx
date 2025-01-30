import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const { user } = useAuth();

  return user ? element : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
