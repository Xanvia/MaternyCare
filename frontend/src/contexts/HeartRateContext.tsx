import { createContext } from "react";

// Define the context type
interface TitleContextType {
  pageTitle: string;
  updateTitle: (title: string) => void;
}

// Create the context with default values
const TitleContext = createContext<TitleContextType | undefined>(undefined);

export default TitleContext;
