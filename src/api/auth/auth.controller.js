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
  const callbackURL = req.query.origin || req.headers.origin;
  const config = {
    method: "post",
    url: "https://api.twitter.com/oauth/request_token",
    headers: {
      Authorization: `OAuth oauth_consumer_key="ywkvzrkLoWlJBDu1yYvBOgywg",oauth_signature_method="HMAC-SHA1",oauth_timestamp="1604841931",oauth_nonce="K7ny27JTpKVsTgdyLeDfmQQWVLELj2zAK5BslRsqyw",oauth_version="1.0",oauth_callback="${encodeURIComponent(
        callbackURL
      )}",oauth_signature="${
        callbackURL === "http://localhost:3000"
          ? "jV1z4bGB4y1GOXLkTcKossodT8A%3D"
          : "aLYW38V2vaDPLV7bvD1En6dyGMM%3D"
      }"`,
    },
  };

  axios(config)
    .then((response) => {
      // console.log(JSON.stringify(response.data));
      return successResponse(res, "Request Token and Secret", response.data);
    })
    .catch((e) => {
      // console.log(error);
      return failureResponse(res, e.message, e);
    });
};
