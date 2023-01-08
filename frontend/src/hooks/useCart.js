import { useState, useEffect } from "react";

const getCartFromLocalStorage = () => {
  const cart = localStorage.getItem("cart");

  return cart ? JSON.parse(cart) : [];
};

const useCart = () => {
  const [cart, setCart] = useState(getCartFromLocalStorage());

  const updateProduct = ({ _id, quantity, ...rest }) => {
    const isUpdate = cart.some((item) => item._id === _id);
    if (isUpdate) {
      setCart(
        cart.map((item) => {
          if (item._id !== _id) return item;
          return {
            ...item,
            quantity: item.quantity + quantity,
            ...rest,
          };
        })
      );
    } else {
      setCart([...cart, { _id, quantity, ...rest }]);
    }
  };

  const removeProduct = (_id) => {
    setCart(cart.filter((item) => item._id !== _id));
  };

  const amount = cart.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return { cart, amount, updateProduct, removeProduct };
};

export default useCart;
