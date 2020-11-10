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
    const { data } = result;
    const replies = await Promise.all(
      data.map((item) =>
        searchTweetsFunction(req, item.user && item.user.screen_name)
      )
    );
    data.map((item, i) => {
      const tweetId = item.id_str;
      const userReplies = replies[i].filter((reply) => {
        if (
          reply &&
          reply.referenced_tweets &&
          reply.referenced_tweets[0] &&
          reply.referenced_tweets[0].id === tweetId
        ) {
          return reply;
        }
      });
      data[i].replies = userReplies;
    });

    return successResponse(res, "List of mentions", data);
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

/**
 * @function searchTweetsFunction
 * @description Function to search tweets
 */
const searchTweetsFunction = (req, screenName) => {
  return requestTwitter(
    req,
    "GET",
    "https://api.twitter.com/2/tweets/search/recent",
    {
      query: screenName,
      "tweet.fields": "in_reply_to_user_id,referenced_tweets",
    }
  )
    .then((response) => response && response.data && response.data.data)
    .catch((e) => e);
};

/**
 * @function searchTweets
 * @description Function to search tweets
 */
module.exports.searchTweets = async (req, res) => {
  const { screenName } = req.params;

  const result = await requestTwitter(
    req,
    "GET",
    "https://api.twitter.com/2/tweets/search/recent",
    {
      query: screenName,
      "tweet.fields": "in_reply_to_user_id,referenced_tweets",
    }
  );

  if (result && result.success) {
    return successResponse(
      res,
      "List of matched tweets",
      result && result.data && result.data.data
    );
  }
  return failureResponse(res, result.message, result);
};
