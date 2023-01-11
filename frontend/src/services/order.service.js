import api from "./api";

export const getOrders = () => api.get("/orders");

export const create = (data) => api.post("/orders", data);

export const deleteOrder = (id) => api.delete(`/orders/${id}`);
