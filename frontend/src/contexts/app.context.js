import { createContext } from "react";
import { useState } from "react";

import useCart from "../hooks/useCart";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const cartState = useCart();

  const [isInitialized, setIsInitialized] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <AppContext.Provider
      value={{
        cartState,
        isInitialized,
        setIsInitialized,
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
