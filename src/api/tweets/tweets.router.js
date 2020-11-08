const express = require("express");
const authRouter = express.Router();

// CONTROLLERS
const { fetchMentions } = require("./tweets.controller");

authRouter.get("/mentions", fetchMentions);
module.exports = authRouter;
