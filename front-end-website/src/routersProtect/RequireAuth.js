
import { useLocation, Navigate } from "react-router-dom";

function RequireAuth({ children }) {
  let location = useLocation();

  if (
    !localStorage.getItem("accessToken") ||
    !localStorage.getItem("refreshToken")
  ) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;