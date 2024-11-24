// HeartRateContextProvider.js
import React, { useState, ReactNode } from "react";

// Define the context type
interface TitleContextType {
  pageTitle: string;
  updatePageTitle: (pageTitle: string) => void;
}

// Define the props for the provider
interface TitleContextProviderProps {
  children: ReactNode;
}

// Create the context with default values
export const TitleContext = React.createContext<TitleContextType | undefined>(
  undefined
);

const TitleContextProvider: React.FC<TitleContextProviderProps> = ({
  children,
}) => {
  const [pageTitle, setPageTitle] = useState("Dashboard");

  const updatePageTitle = (newTitle: string) => {
    setPageTitle(newTitle);
  };

  return (
    <TitleContext.Provider value={{ pageTitle, updatePageTitle }}>
      {children}
    </TitleContext.Provider>
  );
};

export default TitleContextProvider;
