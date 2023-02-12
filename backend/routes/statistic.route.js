const express = require("express");

const auth = require("../middlewares/auth.middleware");
const statisticController = require("../controllers/statistic.controller");

const statisticRoute = express.Router();

statisticRoute.get(
  "/statistic",
  auth(["Admin"]),
  statisticController.getStatistic
);

module.exports = statisticRoute;
