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
  const config = {
    method: "post",
    url: "https://api.twitter.com/oauth/request_token",
    headers: {
      Authorization: `OAuth oauth_consumer_key="ywkvzrkLoWlJBDu1yYvBOgywg",oauth_signature_method="HMAC-SHA1",oauth_timestamp="${Math.floor(
        Date.now() / 1000
      )}",oauth_nonce="${randomStr()}",oauth_version="1.0",oauth_callback="${encodeURIComponent(
        req.query.origin || req.headers.origin
      )}",oauth_signature="jV1z4bGB4y1GOXLkTcKossodT8A%3D"`,
    },
  };

  axios(config)
    .then((response) => {
      // console.log(JSON.stringify(response.data));
      return successResponse(res, "Request Token", response);
    })
    .catch((e) => {
      // console.log(error);
      return failureResponse(res, e.message, e);
    });
};

const randomStr = () => {
  const len = 50;
  const arr = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let ans = "";
  for (let i = len; i > 0; i--) {
    ans += arr[Math.floor(Math.random() * arr.length)];
  }
  return ans;
};
