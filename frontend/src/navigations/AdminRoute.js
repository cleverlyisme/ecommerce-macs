import { Routes, Route, Navigate } from "react-router-dom";

import Admin from "../pages/Admin/index";
import Order from "../pages/Admin/components/Order";
import { checkAuth } from "../services/auth.service";
import LoginRoute from "./LoginRoute";

import useAppContext from "../hooks/useAppContext";
import { useEffect, useState } from "react";
import Login from "../pages/Login/Login";

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
      <Route path="/order" element={<Order />} />
      <Route path="/" element={<Admin />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AdminRoute;
