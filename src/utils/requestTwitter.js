const axios = require("axios");
const { getAuthorization } = require("./twitterSignature");

module.exports.requestTwitter = (
  req,
  method,
  url,
  reqParams = {},
  accessCreds,
  logEndpoint
) => {
  console.log(
    "Endpoint: ",
    logEndpoint || `${req && req.method} ${req && req.url}`
  );
  console.log(`Inside requestTwitter, args; `, {
    method,
    url,
    reqParams,
    accessCreds,
    logEndpoint,
  });
  const authHeaderValue = getAuthorization(
    method && method.toUpperCase(),
    url,
    reqParams,
    accessCreds && accessCreds.token,
    accessCreds && accessCreds.tokenSecret
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
      console.log("Inside requestTwitter, response.data", data);
      return {
        success: true,
        data,
      };
    })
    .catch((error) => {
      console.log("Inside requestTwitter, Error Msg: ", error && error.message);
      console.log("Inside requestTwitter, Error: ", error);
      return {
        success: false,
        // error,
      };
    });
};
