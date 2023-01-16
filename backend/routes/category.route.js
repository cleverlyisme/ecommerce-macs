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
categoryRoute.post(
  "/categories/:id/cpu",
  auth(["Admin"]),
  categoryController.createCpu
);
categoryRoute.put(
  "/categories/:id",
  auth(["Admin"]),
  categoryController.updateCategory
);
categoryRoute.put(
  "/categories/:id/cpu/:cpuId",
  auth(["Admin"]),
  categoryController.updateCpu
);
categoryRoute.delete(
  "/categories/:id",
  auth(["Admin"]),
  categoryController.deleteCategory
);
categoryRoute.delete(
  "/categories/:id/cpu/:cpuId",
  auth(["Admin"]),
  categoryController.deleteCpu
);

module.exports = categoryRoute;
