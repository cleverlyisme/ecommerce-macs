import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { checkAuth } from "../services/auth.service";
import LoginRoute from "./LoginRoute";

import ProductList from "../pages/Admin/ProductList";
import ProductDetail from "../pages/Admin/ProductDetail";
import UserList from "../pages/Admin/UserList";
import UserDetail from "../pages/Admin/UserDetail";
import OrderList from "../pages/Admin/OrderList";
import OrderDetail from "../pages/Admin/OrderDetail";

import { AdminContextProvider } from "../contexts/admin.context";
import useAdminContext from "../hooks/useAdminContext";

const AdminRoute = () => {
  const { isInitialized, setIsInitialized, user, setUser } = useAdminContext();

  const checkAuthenication = async () => {
    try {
      const res = await checkAuth();
      setUser(res.data);
    } catch (err) {
      console.log(err.message);
      localStorage.removeItem("accessToken");
    }
    setIsInitialized(true);
  };

  useEffect(() => {
    checkAuthenication();
  }, []);

  console.log(user);

  if (!isInitialized) return null;

  if (user !== "OK")
    return (
      <Routes>
        <Route path="/login" element={<LoginRoute />} />
        <Route path="*" element={<Navigate to="/admin/login" replace />} />
      </Routes>
    );

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

export default () => (
  <AdminContextProvider>
    <AdminRoute />
  </AdminContextProvider>
);
