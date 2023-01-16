const express = require("express");

const auth = require("../middlewares/auth.middleware");
const userController = require("../controllers/user.controller");

const userRoute = express.Router();

userRoute.get("/users", auth(["Admin"]), userController.getUsers);
userRoute.get("/users/:id", auth(["Admin"]), userController.getById);
userRoute.get("/users/history/:id", auth(), userController.getUserHistory);
userRoute.delete("/users/:id", auth(["Admin"]), userController.deleteUser);

module.exports = userRoute;
