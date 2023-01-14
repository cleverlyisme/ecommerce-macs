const express = require("express");

const auth = require("../middlewares/auth.middleware");
const productController = require("../controllers/product.controller");

const productRoute = express.Router();

productRoute.get("/products", productController.getProducts);
productRoute.get("/products/:id", productController.getById);
productRoute.post(
  "/products",
  auth(["Admin"]),
  productController.createProduct
);
productRoute.put(
  "/products/:id",
  auth(["Admin"]),
  productController.updateProduct
);
productRoute.delete(
  "/products/:id",
  auth(["Admin"]),
  productController.deleteProduct
);

module.exports = productRoute;
