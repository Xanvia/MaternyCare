import React from "react";
import useRoleProtection from "../customHooks/useRoleProtection";

const DashboardMOH = () => {
  useRoleProtection("moh");

  return <div>DashboardMOH</div>;
};

export default DashboardMOH;
