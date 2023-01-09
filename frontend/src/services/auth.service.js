import api from "./api";

export const login = (data) => api.post("/login", data);

export const getInfo = () => api.get("/me");

export const checkAuth = () => api.get("/checkAuth");
