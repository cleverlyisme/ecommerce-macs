import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { checkAuth } from "../services/auth.service";
import LoginRoute from "./LoginRoute";

import ProductList from "../pages/Admin/ProductList";
import ProductDetail from "../pages/Admin/ProductDetail";
import OrderList from "../pages/Admin/OrderList";

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
      <Route path="/orders" element={<OrderList />} />
      <Route path="*" element={<Navigate to="/admin/products" replace />} />
    </Routes>
  );
};

export default () => (
  <AdminContextProvider>
    <AdminRoute />
  </AdminContextProvider>
);
