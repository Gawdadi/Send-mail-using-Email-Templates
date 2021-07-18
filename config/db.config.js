const mongoose = require("mongoose"),
  config = require("./app.config");

class DatabaseConfig {
  constructor() {}
}

DatabaseConfig.prototype.connect = function () {
  /**
   * Add environment here.
   */

  switch (process.env.NODE_ENV) {
    /**
     * This is used for local database. With URI String
     */
    case "DEVELOPMENT":
      var mongoDB = `mongodb+srv://${config.db.username}:${config.db.password}@${config.db.host}/${config.db.name}`;
      mongoose.connect(mongoDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      break;

    /**
     * This is used for production database. Without URI String.
     * If using string just add '+srv' same as DEVELOPMENT env.
     *
     */
    case "PRODUCTION":
      var mongoDB = `mongodb://${config.db.username}:${config.db.password}@${config.db.host}/${config.db.name}?authSource=admin&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false`;
      mongoose.connect(mongoDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      break;

    default:
      break;
  }

  const connection = mongoose.connection;
  connection.on(
    "open",
    () => {
      console.log(`Connected to ${process.env.NODE_ENV} DB`);
    },
    (error) => {
      console.log(error);
    }
  );
};

module.exports = new DatabaseConfig();
