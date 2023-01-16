import api from "./api";

export const getCategories = () => api.get("/categories");

export const createCategory = (data) => api.post("/categories", data);

export const updateCategory = (id, data) => api.put(`/categories/${id}`, data);

export const createCpu = (cateId, data) =>
  api.post(`/categories/${cateId}/cpu`, data);

export const updateCpu = (cateId, cpuId, data) =>
  api.put(`/categories/${cateId}/cpu/${cpuId}`, data);

export const deleteCpu = (cateId, cpuId, data) =>
  api.delete(`/categories/${cateId}/cpu/${cpuId}`, data);

export const deleteCategory = (id) => api.delete(`/categories/${id}`);
