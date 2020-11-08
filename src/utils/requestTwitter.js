const axios = require("axios");

module.exports.requestTwitter = (req, method, url) => {
  const { query, headers } = req;
  const callbackURL = (query && query.origin) || (headers && headers.origin);
  const { oauthToken } = query;

  const config = {
    method,
    url,
    headers: {
      Authorization: `OAuth oauth_consumer_key="ywkvzrkLoWlJBDu1yYvBOgywg",oauth_token="${oauthToken}",oauth_signature_method="HMAC-SHA1",oauth_timestamp="1604865672",oauth_nonce="5MllfXLkERX",oauth_version="1.0",oauth_signature="${
        callbackURL === "http://localhost:3000"
          ? "uilunBvGzeybqQLZDxuxpn6dGpY%3D"
          : "uilunBvGzeybqQLZDxuxpn6dGpY%3D"
      }"`,
    },
  };

  return axios(config)
    .then((response) => {
      // console.log("response.data", response && response.data);
      return response;
    })
    .catch((error) => {
      // console.log("Inside requestTwitter, Error: ", error && error.message);
      throw error;
    });
};
