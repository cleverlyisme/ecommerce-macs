import api, { apiUpload } from "./api";

export const getProducts = ({
  page,
  limit,
  categoryId,
  gt,
  lt,
  price,
  cpuId,
  productName,
}) =>
  api.get("/products", {
    params: { page, limit, categoryId, gt, lt, price, cpuId, productName },
  });

export const getProductById = (id) => api.get("/products/" + id);

export const update = (id, data) => api.put(`/products/${id}`, data);

export const uploadPhoto = (formData) => apiUpload.post("/photos", formData);

export const deleteProduct = (id) => api.delete("/products/" + id);

export const createProduct = (data) => api.post("/products", data);

export const ratingStar = (data, id) =>
  api.post("/products/rating/" + id, data);
