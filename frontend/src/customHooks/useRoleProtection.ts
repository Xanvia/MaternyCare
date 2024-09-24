import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useRoleProtection = (requiredRole: string) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (user.role !== requiredRole) {
      navigate("/unauthorized");
    }
  }, [navigate, requiredRole, user.role]);
};

export default useRoleProtection;
