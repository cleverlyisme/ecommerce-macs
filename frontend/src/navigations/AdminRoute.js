import { Routes, Route, Navigate } from "react-router-dom";

import { checkAuth } from "../services/auth.service";
import LoginRoute from "./LoginRoute";

import { useEffect, useState } from "react";
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
      <Route path="/orders" element={<Order />} />
      <Route path="/" element={<Admin />} />
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
};

export default () => (
  <AdminContextProvider>
    <AdminRoute />
  </AdminContextProvider>
);
