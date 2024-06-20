import { Navigate } from "react-router-dom";

interface RoleBasedRouteProps {
  children: React.ReactNode;
  requiredRole: string;
}

export const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({
  children,
  requiredRole,
}) => {
  let userItem = localStorage.getItem("user");
  const user = userItem && JSON.parse(userItem);
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (user.role !== requiredRole) {
    console.log("unautherized");

    return <Navigate to="/unauthorized" />;
  }

  return <>{children}</>;
};
