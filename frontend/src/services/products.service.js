import api from './api';

export const getProducts = ({ page, limit, categoryId }) =>
  api.get('/products', { params: { page, limit, categoryId } });

export const getProductById = (id) => api.get('/products/' + id);

export const update = (id, data) => api.put(`/products/${id}`, data);
