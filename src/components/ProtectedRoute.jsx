import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { isTokenValid } from "@/utils/authHelper"; // Import fungsi dari langkah 1

const ProtectedRoute = ({ allowedRoles, Component }) => {
  const token = localStorage.getItem("userJwt");
  const isAuthenticated = isTokenValid(token, allowedRoles);
  const location = useLocation();

  if (!isAuthenticated) {
    // Jika tidak valid, redirect ke halaman depan ('/' adalah halaman login/homepage)
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return (
    <Component>
      <Outlet />
    </Component>
  );
};

export default ProtectedRoute;
