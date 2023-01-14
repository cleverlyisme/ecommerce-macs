import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Admin/Login";

const LoginAdminRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default LoginAdminRoute;
