import { Routes, Route, Navigate } from 'react-router-dom';

import Admin from '../pages/Admin';

const AdminRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Admin />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AdminRoute;
