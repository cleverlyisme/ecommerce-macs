const express = require("express");

const auth = require("../middlewares/auth.middleware");
const authController = require("../controllers/auth.controller");

const authRoute = express.Router();

authRoute.post("/login", authController.login);
authRoute.post("/register", authController.register);
authRoute.get("/checkAuth", auth(), authController.checkAuth);

module.exports = authRoute;
