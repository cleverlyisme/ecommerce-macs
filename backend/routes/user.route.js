const express = require("express");

const auth = require("../middlewares/auth.middleware");
const userController = require("../controllers/user.controller");

const userRoute = express.Router();

userRoute.get("/users", auth(), userController.getUsers);
userRoute.get("/users/:id", auth(), userController.getById);
userRoute.post("/users", auth(), userController.createUser);
userRoute.put("/users/:id", auth(), userController.updateUser);
userRoute.delete("/users/:id", auth(), userController.deleteUser);

module.exports = userRoute;
