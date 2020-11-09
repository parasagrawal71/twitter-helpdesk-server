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
