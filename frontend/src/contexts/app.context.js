import { createContext } from "react";
import { useState } from "react";

import useCart from "../hooks/useCart";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const cartState = useCart();

  const [isInitialized, setIsInitialized] = useState(false);

  return (
    <AppContext.Provider value={{ cartState, isInitialized, setIsInitialized }}>
      {children}
    </AppContext.Provider>
  );
};
