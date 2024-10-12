import React from "react";
import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  children: React.ReactNode;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (token) {
    switch (user.role) {
      case "mother":
        return <Navigate to="/motherdashboard" />;
      case "phm":
        return <Navigate to="/phmdashboard" />;
      case "moh":
        return <Navigate to="/mohdashboard" />;
      default:
        return <Navigate to="/unauthorized" />;
    }
  }

  return children;
};
