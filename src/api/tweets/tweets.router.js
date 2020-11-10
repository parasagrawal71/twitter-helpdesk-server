const express = require("express");
const authRouter = express.Router();

// CONTROLLERS
const { fetchMentions, replyToTweet } = require("./tweets.controller");

authRouter.get("/mentions", fetchMentions);
authRouter.post("/reply/:id", replyToTweet);
module.exports = authRouter;
