const { google } = require("googleapis"),
  appConfig = require("../config/app.config"),
  Email = require("email-templates");

const CLIENT_USER = appConfig.google.client_user;
const CLIENT_ID = appConfig.google.client_id;
const CLIENT_SECRET = appConfig.google.client_secret;
const REDIRECT_URI = appConfig.google.redirect_uri;
const REFRESH_TOKEN = appConfig.google.refresh_token;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

class EmailController {
  constructor() {}
}

EmailController.prototype.sendMail = async (enquiry) => {
  try {
    // Get new access token evertime.
    const accessToken = await oAuth2Client.getAccessToken();

    // Set your own variables in .env file.
    const transport = {
      service: "gmail",
      auth: {
        type: "OAUTH2",
        user: CLIENT_USER,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    };

    const email = new Email({
      // It will send mail for PRODUCTION env.
      send: process.env.NODE_ENV === "DEVELOPMENT" ? false : true,
      preview: process.env.NODE_ENV === "DEVELOPMENT" ? true : false,
      transport: transport,
      textOnly: true,
    });

    return email.send({
      template: "user",
      message: {
        from: "test@gmail.com",
        to: enquiry.email,
        subject: enquiry.subject,
      },
      locals: {
        enquiry: enquiry,
      },
    });
  } catch (error) {
    return error;
  }
};

module.exports = new EmailController();
