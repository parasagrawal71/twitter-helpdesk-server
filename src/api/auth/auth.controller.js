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
    const tempArr = data && data.split("&");
    const dataArray =
      tempArr && tempArr.map((item) => item && item.split("=")[1]);
    const tokenData = {
      oauth_token: dataArray[0],
      oauth_token_secret: dataArray[1],
      user_id: dataArray[2],
      screen_name: dataArray[3],
    };

    const userData = await fetchUserData(req, dataArray[3], {
      token: dataArray[0],
      tokenSecret: dataArray[1],
    }).catch((e) => e);
    if (userData && userData.success) {
      const result = {
        ...tokenData,
        currUser: userData.data && userData.data.data,
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

const fetchUserData = (req, screenName, accessCreds) => {
  return requestTwitter(
    req,
    "GET",
    `https://api.twitter.com/2/users/by/username/${screenName}`,
    { "user.fields": "profile_image_url" },
    accessCreds
  );
};
