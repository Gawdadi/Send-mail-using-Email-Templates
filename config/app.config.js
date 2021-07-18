const env = require("dotenv");
env.config();

module.exports = {
  app: {
    port: process.env.APP_PORT || 9200,
  },

  db: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    name: process.env.DB_NAME,
    host: process.env.DB_HOST,
  },

  google: {
    client_user: process.env.GOOGLE_CLIENT_USER,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI,
    refresh_token: process.env.GOOGLE_RERESH_TOKEN,
  },
};
