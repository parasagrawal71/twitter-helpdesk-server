const axios = require("axios");
const { getAuthorization } = require("./twitterSignature");

module.exports.requestTwitter = (req, method, url, reqParams = {}) => {
  console.log("Endpoint: ", req && req.method, req && req.url);
  const authHeaderValue = getAuthorization(
    method && method.toUpperCase(),
    url,
    reqParams
  );

  return axios({
    method: method && method.toLowerCase(),
    url,
    headers: {
      Authorization: authHeaderValue,
    },
    params: reqParams,
  })
    .then((response) => {
      const { data } = response;
      // console.log("Inside requestTwitter, response.data", data);
      return {
        success: true,
        data,
      };
    })
    .catch((error) => {
      console.log("Inside requestTwitter, Error: ", error && error.message);
      return {
        success: false,
        error,
      };
    });
};
