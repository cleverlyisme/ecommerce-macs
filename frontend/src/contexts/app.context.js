import { createContext } from 'react';

import useCart from '../hooks/useCart';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const cartState = useCart();

  return (
    <AppContext.Provider value={{ cartState }}>{children}</AppContext.Provider>
  );
};
