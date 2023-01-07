import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import ProductDetail from "../pages/ProductDetail/ProductDetail";

const ProductRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product" element={<ProductDetail />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default ProductRoute;
