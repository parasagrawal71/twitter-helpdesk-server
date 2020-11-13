const {
  successResponse,
  failureResponse,
} = require("../../utils/response.format");
const { requestTwitter } = require("../../utils/requestTwitter");
const _ = require("lodash");

/**
 * @function fetchMentions
 * @description Function to fetch mentions for current user
 */
module.exports.fetchMentions = async (req, res) => {
  const result = await requestTwitter(
    req,
    "get",
    "https://api.twitter.com/1.1/statuses/mentions_timeline.json",
    {},
    req && req.query
  );

  if (result && result.success) {
    let { data } = result;
    data = data.filter((item) => !item.in_reply_to_status_id_str);
    const tempReplies = data.filter((item) => item.in_reply_to_status_id_str);
    const currUserScreenName =
      data[0] &&
      data[0].entities &&
      data[0].entities.user_mentions &&
      data[0].entities.user_mentions[0] &&
      data[0].entities.user_mentions[0].screen_name;
    let repliesArr = await Promise.all(
      data.map((item) =>
        searchTweetsFunction(
          req,
          item.user && item.user.screen_name,
          req && req.query
        )
      )
    );
    const currUserReplies = await searchTweetsFunction(
      req,
      currUserScreenName,
      req && req.query
    );

    let replies = [...tempReplies, ...currUserReplies];
    repliesArr &&
      repliesArr.map((arr) => {
        arr &&
          arr.map((item) => {
            replies.push(item);
          });
      });
    const updatedData = data.map((item) => {
      let updatedItem = updateReplies(item, replies);
      const updatedReplies = _.uniqBy(updatedItem && updatedItem.replies, "id");
      updatedItem.replies = updatedReplies;
      return updatedItem;
    });

    return successResponse(res, "List of mentions", updatedData);
  }
  return failureResponse(res, result.message, result);
};

const updateReplies = (tweet, replies) => {
  const tweetId = tweet.id_str || tweet.id;
  const leftReplies = [];
  const userReplies =
    replies &&
    replies.filter((reply) => {
      if (
        reply &&
        reply.referenced_tweets &&
        reply.referenced_tweets[0] &&
        reply.referenced_tweets[0].id === tweetId
      ) {
        return reply;
      }
      leftReplies.push(reply);
    });

  tweet.replies = userReplies ? userReplies : [];

  if (leftReplies.length) {
    userReplies.map((ur) => {
      updateReplies(ur, leftReplies);
    });
  }

  return tweet;
};

/**
 * @function searchTweetsFunction
 * @description Function to search tweets
 */
const searchTweetsFunction = (req, screenName, accessCreds) => {
  if (!screenName) {
    return;
  }

  return requestTwitter(
    req,
    "GET",
    "https://api.twitter.com/2/tweets/search/recent",
    {
      query: screenName,
      "tweet.fields": "in_reply_to_user_id,referenced_tweets",
      max_results: 100,
    },
    accessCreds,
    `searchTweets for ${screenName}`
  )
    .then((response) => response && response.data && response.data.data)
    .catch((e) => e);
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
    { in_reply_to_status_id: id, status },
    req && req.query
  );

  if (result && result.success) {
    return successResponse(res, "Replied successfully", result && result.data);
  }
  return failureResponse(res, result.message, result);
};
