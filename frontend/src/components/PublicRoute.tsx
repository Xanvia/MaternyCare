import { Navigate } from "react-router-dom";
import React from "react";

interface PublicRouteProps {
  children: React.ReactNode;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const token = localStorage.getItem("token");
  let userItem = localStorage.getItem("user");
  const user = userItem && JSON.parse(userItem);
  // const role = localStorage.getItem("role");

  return token ? (
    <Navigate
      to={`${user.role === "mother" ? "/dashboard" : "/phmdashboard"}`}
    />
  ) : (
    children
  );
};
