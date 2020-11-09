const axios = require("axios");
const {
  successResponse,
  failureResponse,
} = require("../../utils/response.format");
const { requestTwitter } = require("../../utils/requestTwitter");

/**
 * @function requestToken
 * @description Function to request the token to twitter request_token endpoint
 */
module.exports.requestToken = async (req, res) => {
  const result = await requestTwitter(
    req,
    "POST",
    "https://api.twitter.com/oauth/request_token"
  );

  if (result && result.success) {
    return successResponse(
      res,
      "Request Token and Secret",
      result && result.data
    );
  }
  return failureResponse(res, result.message, result);
};

/**
 * @function accessToken
 * @description Function to request the access token to twitter /access_token endpoint
 */
module.exports.accessToken = async (req, res) => {
  const { oauth_token, oauth_verifier } = req && req.body;

  const response = await axios({
    method: "post",
    url: "https://api.twitter.com/oauth/access_token",
    params: {
      oauth_token,
      oauth_verifier,
    },
  }).catch((e) => e);

  if (response && response.data) {
    const { data } = response;
    const screenName = data.split("&")[3].split("=")[1];

    const userData = await fetchUserData(req, screenName).catch((e) => e);
    if (userData && userData.success) {
      const result = {
        tokenData: response && response.data,
        currUser: userData.data,
      };
      return successResponse(
        res,
        "Request Acess Token and Access Token Secret",
        result
      );
    }
  }
  return failureResponse(res, response.message, response);
};

const fetchUserData = (req, screenName) => {
  return requestTwitter(
    req,
    "GET",
    `https://api.twitter.com/2/users/by/username/${screenName}`,
    { "user.fields": "profile_image_url" }
  );
};
