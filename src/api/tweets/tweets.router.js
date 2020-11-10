const express = require("express");
const tweetRouter = express.Router();

// CONTROLLERS
const {
  fetchMentions,
  replyToTweet,
  searchTweets,
} = require("./tweets.controller");

tweetRouter.get("/mentions", fetchMentions);
tweetRouter.post("/reply/:id", replyToTweet);
tweetRouter.get("/search/:screenName", searchTweets);
module.exports = tweetRouter;
