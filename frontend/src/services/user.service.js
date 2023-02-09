import api, { apiUpload } from "./api";

export const getUserHistory = () => api.get("/users/history");

export const getUsers = ({ page, limit }) =>
  api.get("/users", { params: { page, limit } });
