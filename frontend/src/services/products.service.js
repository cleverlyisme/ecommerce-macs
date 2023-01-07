import api from "./api";

export const getProducts = ({ page, limit, categoryId }) =>
  api.get("/products", { params: { page, limit, categoryId } });
