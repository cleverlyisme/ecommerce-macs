import api, { apiUpload } from "./api";

export const getUserHistory = () => api.get("/users/history");
