import React from "react";
import { Navigate } from "react-router-dom";

function AdminProtectedRoute({ children }) {

  const admin =
    localStorage.getItem("admin");

  return admin
    ? children
    : <Navigate to="/admin" />;
}

export default AdminProtectedRoute;