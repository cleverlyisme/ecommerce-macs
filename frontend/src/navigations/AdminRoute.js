import { Routes, Route, Navigate } from "react-router-dom";

import { checkAuth } from "../services/auth.service";
import LoginRoute from "./LoginRoute";

import useAppContext from "../hooks/useAppContext";
import { useEffect, useState } from "react";
import ProductList from "../pages/Admin/ProductList";
import ProductDetail from "../pages/Admin/ProductDetail";
import UserList from "../pages/Admin/UserList";
import UserDetail from "../pages/Admin/UserDetail";
import OrderList from "../pages/Admin/OrderList";
import OrderDetail from "../pages/Admin/OrderDetail";

const AdminRoute = () => {
  const { isInitialized, setIsInitialized } = useAppContext();
  const [data, setData] = useState("");

  const checkAuthenication = async () => {
    try {
      const res = await checkAuth();
      setData(res.data);
    } catch (err) {
      console.log(err.message);
    }
    setIsInitialized(true);
  };

  useEffect(() => {
    checkAuthenication();
  }, []);

  console.log(data);

  if (!isInitialized) return null;

  if (data !== "OK") return <LoginRoute />;

  return (
    <Routes>
      <Route path="/products" element={<ProductList />} />
      <Route path="/products/create" element={<ProductDetail />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/users/" element={<UserList />} />
      <Route path="/users/create" element={<UserDetail />} />
      <Route path="/users/:id" element={<UserDetail />} />
      <Route path="/orders" element={<OrderList />} />
      <Route path="/orders/create" element={<OrderDetail />} />
      <Route path="/orders/:id" element={<OrderDetail />} />
      <Route path="*" element={<Navigate to="/admin/users" replace />} />
    </Routes>
  );
};

export default AdminRoute;
