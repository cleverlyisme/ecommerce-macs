import api, { apiUpload } from "./api";

export const getProducts = ({ page, limit, categoryId }) =>
  api.get("/products", { params: { page, limit, categoryId } });

export const getProductById = (id) => api.get("/products/" + id);

export const update = (id, data) => api.put(`/products/${id}`, data);

export const uploadPhoto = (formData) => apiUpload.post("/photos", formData);

export const deleteProduct = (id) => api.delete("/products/" + id);
