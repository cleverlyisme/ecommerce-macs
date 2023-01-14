import api from "./api";

export const login = (data) => api.post("/login", data);

export const register = (data) => api.post("/register", data);

export const getInfo = () => api.get("/me");

export const checkAuth = () => api.get("/checkAuth");
