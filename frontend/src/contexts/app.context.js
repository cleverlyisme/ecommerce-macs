import { createContext, useEffect, useState } from 'react';

export const AppContext = createContext();

const mockData = [
  {
    _id: 1,
    name: 'Macbook pro 2020',
    price: 19000000,
    quantity: 2,
  },
  {
    _id: 2,
    name: 'Macbook pro 2019',
    price: 19000000,
    quantity: 2,
  },
];

const getCartFromLocalStorage = () => {
  const cart = localStorage.getItem('cart');

  return cart ? JSON.parse(cart) : [...mockData];
};

export const AppContextProvider = ({ children }) => {
  const [cart, setCart] = useState(getCartFromLocalStorage());

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <AppContext.Provider value={{ cart, setCart }}>
      {children}
    </AppContext.Provider>
  );
};
