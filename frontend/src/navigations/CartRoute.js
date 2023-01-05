import { Routes, Route, Navigate } from "react-router-dom";

import Cart from "../pages/Cart/Cart";

const CartRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Cart />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default CartRoute;
