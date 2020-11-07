const axios = require("axios");
const {
  successResponse,
  failureResponse,
} = require("../../utils/response.format");

/**
 * @function requestToken
 * @description Function to request the token to twitter request_token endpoint
 */
module.exports.requestToken = (req, res) => {
  axios
    .request({
      method: "POST",
      url: "https://api.twitter.com/oauth/request_token",
      Authorization: `OAuth oauth_nonce="K7ny27JTpKVsTgdyLeDfmQQWVLELj2zAK5BslRsqyw", oauth_callback="http%3A%2F%2Flocalhost%3A3000%2F", oauth_signature_method="HMAC-SHA1", oauth_timestamp="${Math.floor(
        new Date().getTime() / 1000
      )}", oauth_consumer_key="JAABlOt9wzw9dyr8SASkPjRrj", oauth_signature="ki0m1aFKtdYisdalDQUOHnfOS0EI5XC1Iez1xbhx0Htox2NwrI", oauth_version="1.0"`,
    })
    .then((response) => {
      // console.log("response: ", response);
      return successResponse(res, "Request Token", response);
    })
    .catch((e) => {
      // console.log("Error: ", e);
      return failureResponse(res, e.message, e);
    });
};
