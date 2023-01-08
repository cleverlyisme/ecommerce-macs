import api from './api';

export const create = (data) => api.post('/orders', data);
