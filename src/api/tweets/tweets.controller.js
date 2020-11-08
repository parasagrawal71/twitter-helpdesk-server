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
module.exports.fetchMentions = (req, res) => {
  requestTwitter(
    req,
    "get",
    "https://api.twitter.com/1.1/statuses/mentions_timeline.json"
  )
    .then((response) => {
      return successResponse(
        res,
        "List of mentions",
        response && response.data
      );
    })
    .catch((e) => {
      return failureResponse(res, e.message, e);
    });
};
