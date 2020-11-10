const axios = require("axios");
const {
  successResponse,
  failureResponse,
} = require("../../utils/response.format");
const { requestTwitter } = require("../../utils/requestTwitter");

/**
 * @function fetchMentions
 * @description Function to fetch mentions for current user
 */
module.exports.fetchMentions = async (req, res) => {
  const result = await requestTwitter(
    req,
    "get",
    "https://api.twitter.com/1.1/statuses/mentions_timeline.json"
  );

  if (result && result.success) {
    return successResponse(res, "List of mentions", result && result.data);
  }
  return failureResponse(res, result.message, result);
};

/**
 * @function replyToTweet
 * @description Function to reply a tweet
 */
module.exports.replyToTweet = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const result = await requestTwitter(
    req,
    "POST",
    "https://api.twitter.com/1.1/statuses/update.json",
    { in_reply_to_status_id: id, status }
  );

  if (result && result.success) {
    return successResponse(res, "Replied successfully", result && result.data);
  }
  return failureResponse(res, result.message, result);
};
