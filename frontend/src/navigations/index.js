import { Routes, Route } from 'react-router-dom';

import HomeRoute from './HomeRoute';
import ProductRoute from './ProductRoute';
import CartRoute from './CartRoute';
import AdminRoute from './AdminRoute';

const Navigation = () => {
  return (
    <Routes>
      <Route path="/products/*" element={<ProductRoute />} />
      <Route path="/admin/*" element={<AdminRoute />} />
      <Route path="/cart/*" element={<CartRoute />} />
      <Route path="*" element={<HomeRoute />} />
    </Routes>
  );
};

export default Navigation;
