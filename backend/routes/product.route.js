const express = require("express");

const auth = require("../middlewares/auth.middleware");
const productController = require("../controllers/product.controller");

const productRoute = express.Router();

productRoute.get("/products", productController.getProducts);
productRoute.get("/products/:id", productController.getById);
productRoute.post("/products", auth(), productController.createProduct);
productRoute.put("/products/:id", auth(), productController.updateProduct);
productRoute.delete("/products/:id", auth(), productController.deleteProduct);

module.exports = productRoute;
