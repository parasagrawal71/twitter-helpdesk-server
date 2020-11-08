const express = require("express");

// IMPORT OF ROUTER TO ALL RESOURCES
const userRouter = require("./user/user.router");
const authRouter = require("./auth/auth.router");
const tweetsRouter = require("./tweets/tweets.router");

const apiRouter = express.Router();

// ROUTER TO ALL RESOURCES
apiRouter.use("/user", userRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/tweets", tweetsRouter);

module.exports = apiRouter;
