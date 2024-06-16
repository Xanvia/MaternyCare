// HeartRateContextProvider.js
import React, { useState, ReactNode } from "react";

// Define the context type
interface RoleContextType {
  role: string;
  updateRole: (role: string) => void;
}

// Define the props for the provider
interface RoleContextTypeProps {
  children: ReactNode;
}

// Create the context with default values
export const RoleContext = React.createContext<RoleContextType | undefined>(
  undefined
);

const RoleContextProvider: React.FC<RoleContextTypeProps> = ({ children }) => {
  const [role, setRole] = useState("mother");

  const updateRole = (newRole: string) => {
    setRole(newRole);
  };

  return (
    <RoleContext.Provider value={{ role, updateRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export default RoleContextProvider;
