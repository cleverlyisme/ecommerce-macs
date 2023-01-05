import { Routes, Route } from "react-router-dom";

import HomeRoute from "./HomeRoute";
import ProductRoute from "./ProductRoute";
import LoginRoute from "./LoginRoute";
import SignUpRoute from "./SignUpRoute";
import CartRoute from "./CartRoute";

const Navigation = () => {
  return (
    <Routes>
      <Route path="/products/*" element={<ProductRoute />} />
      <Route path="/login/*" element={<LoginRoute />} />
      <Route path="/signup/*" element={<SignUpRoute />} />
      <Route path="/cart/*" element={<CartRoute />} />
      <Route path="*" element={<HomeRoute />} />
    </Routes>
  );
};

export default Navigation;
