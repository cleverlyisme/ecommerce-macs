import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";

import Login from "../pages/Login/Login";
import HomeRoute from "./HomeRoute";
import useAppContext from "../hooks/useAppContext";
import { getInfo } from "../services/auth.service";

const LoginRoute = () => {
  const { isInitialized, setIsInitialized, user, setUser } = useAppContext();

  const checkAuth = async () => {
    try {
      const res = await getInfo();
      const { userId } = res.data || {};
      if (!userId) throw new Error();
      setUser({ userId });
    } catch (err) {
      localStorage.removeItem("accessToken");
    }
    setIsInitialized(true);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (!isInitialized) return null;

  if (user) return <HomeRoute />;

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default LoginRoute;
