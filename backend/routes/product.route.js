const express = require("express");

const auth = require("../middlewares/auth.middleware");
const productController = require("../controllers/product.controller");

const productRoute = express.Router();

productRoute.get("/products", productController.getProducts);
productRoute.get("/products/:id", productController.getById);
productRoute.post("/products", productController.createProduct);
productRoute.put("/products/:id", productController.updateProduct);
productRoute.delete("/products/:id", productController.deleteProduct);

module.exports = productRoute;
