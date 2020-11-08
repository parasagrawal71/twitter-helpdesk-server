const express = require("express");
const authRouter = express.Router();

// CONTROLLERS
const { requestToken, accessToken } = require("./auth.controller");

authRouter.get("/request_token", requestToken);
authRouter.post("/access_token", accessToken);

module.exports = authRouter;
