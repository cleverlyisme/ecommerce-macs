import { createContext } from "react";
import { useState } from "react";

export const AdminContext = createContext();

export const AdminContextProvider = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <AdminContext.Provider
      value={{ isInitialized, setIsInitialized, user, setUser }}
    >
      {children}
    </AdminContext.Provider>
  );
};
