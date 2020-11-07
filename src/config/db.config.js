module.exports = {
  MONGODB_URI: `mongodb+srv://parasagrawal71:${
    process.env.USER_DB_PASSWORD || "twitter-password-123"
  }@twitter-helpdesk-server.7cauu.mongodb.net/twitter-helpdesk?retryWrites=true&w=majority`,
};
