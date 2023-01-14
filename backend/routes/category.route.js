const express = require("express");

const auth = require("../middlewares/auth.middleware");
const categoryController = require("../controllers/category.controller");
const { UserRoles } = require("../utils/constants");

const categoryRoute = express.Router();

categoryRoute.get("/categories", categoryController.getCategories);
categoryRoute.get(
  "/categories/:id",
  auth(["Admin"]),
  categoryController.getById
);
categoryRoute.post(
  "/categories",
  auth(["Admin"]),
  categoryController.createCategory
);
categoryRoute.put(
  "/categories/:id",
  auth(["Admin"]),
  categoryController.updateCategory
);
categoryRoute.delete(
  "/categories/:id",
  auth(["Admin"]),
  categoryController.deleteCategory
);

module.exports = categoryRoute;
