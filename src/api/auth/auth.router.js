const express = require("express");
const authRouter = express.Router();

// CONTROLLERS
const { requestToken } = require("./auth.controller");

authRouter.get("/request_token", requestToken);

module.exports = authRouter;
