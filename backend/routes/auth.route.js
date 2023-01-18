const express = require("express");

const auth = require("../middlewares/auth.middleware");
const authController = require("../controllers/auth.controller");

const authRoute = express.Router();

authRoute.post("/admin/login", authController.adminLogin);
authRoute.post("/login", authController.login);
authRoute.post("/register", authController.register);
authRoute.get("/checkAuth", auth(["Admin"]), authController.checkAuth);
authRoute.get("/me", auth(), authController.getInfor);

module.exports = authRoute;
