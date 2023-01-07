const express = require("express");

const auth = require("../middlewares/auth.middleware");
const categoryController = require("../controllers/category.controller");
const { UserRoles } = require("../utils/constants");

const categoryRoute = express.Router();

categoryRoute.get("/categories", categoryController.getCategories);
categoryRoute.get(
  "/categories/:id",
  auth([UserRoles.Admin]),
  categoryController.getById
);
categoryRoute.post(
  "/categories",
  auth([UserRoles.Admin]),
  categoryController.createCategory
);
categoryRoute.put(
  "/categories/:id",
  auth([UserRoles.Admin]),
  categoryController.updateCategory
);
categoryRoute.delete(
  "/categories/:id",
  auth([UserRoles.Admin]),
  categoryController.deleteCategory
);

module.exports = categoryRoute;
