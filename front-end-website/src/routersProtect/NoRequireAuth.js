import { useLocation, Navigate } from "react-router-dom";

function NoRequireAuth({ children }) {
  let location = useLocation();

  if (
    localStorage.getItem("accessToken") &&
    localStorage.getItem("refreshToken")
  ) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  return children;
}

export default NoRequireAuth;