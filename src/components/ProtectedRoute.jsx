import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isTokenValid } from "@/utils/authHelper"; // Import fungsi dari langkah 1

const ProtectedRoute = ({ allowedRoles, Component }) => {
  const token = localStorage.getItem("userJwt");
  const isAuthenticated = isTokenValid(token, allowedRoles);

  if (!isAuthenticated) {
    // Jika tidak valid, redirect ke halaman depan ('/' adalah halaman login/homepage)
    return <Navigate to="/" replace />;
  }

  return (
    <Component>
      <Outlet />
    </Component>
  );
};

export default ProtectedRoute;
