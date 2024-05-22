import React, { useState, ReactNode } from "react";

// Define the context type
interface HeartRateContextType {
  heartRate: number;
  updateHeartRate: (heartRate: number) => void;
}

// Define the props for the provider
interface HeartRateContextProviderProps {
  children: ReactNode;
}

// Create the context with default values
export const HeartRateContext = React.createContext<
  HeartRateContextType | undefined
>(undefined);

const HeartRateContextProvider: React.FC<HeartRateContextProviderProps> = ({
  children,
}) => {
  const [heartRate, setHeartRate] = useState(125);

  const updateHeartRate = (heartRate: number) => {
    setHeartRate(heartRate);
  };

  return (
    <HeartRateContext.Provider value={{ heartRate, updateHeartRate }}>
      {children}
    </HeartRateContext.Provider>
  );
};

export default HeartRateContextProvider;
