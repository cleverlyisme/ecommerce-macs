import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";

import Login from "../pages/Login/Login";
import HomeRoute from "./HomeRoute";
import useAppContext from "../hooks/useAppContext";

const LoginRoute = () => {
  const { user } = useAppContext();

  console.log(user);

  if (user) return <HomeRoute />;

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default LoginRoute;
