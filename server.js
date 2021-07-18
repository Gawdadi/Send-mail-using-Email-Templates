const express = require("express"),
  cors = require("cors"),
  morgan = require("morgan"),
  path = require("path"),
  appConfig = require("./config/app.config"),
  dbConfig = require("./config/db.config"),
  enquiry = require("./routes/enquiry.route"),
  router = express.Router(),
  app = express();

class Server {
  constructor() {
    console.log(`App running in ${process.env.NODE_ENV} environment`);
    this.initExpressMiddleWare();
    this.listenPort();
    this.initLogger();
    this.initDatabase();
    this.initRoutes();
  }
}

// Initialize Express Middlewares
Server.prototype.initExpressMiddleWare = () => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(express.static(path.join(__dirname, "public")));

  // Cors

  app.use(
    cors({
      origin: "http://localhost:4200",
      allowedHeaders: "Origin,X-Requested-With,content-type,Authorization",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    })
  );
};

// Listen port
Server.prototype.listenPort = () => {
  app.listen(appConfig.app.port, () => {
    console.log("Server started at port " + appConfig.app.port);
  });
};

// Initialize MongoDB
Server.prototype.initDatabase = () => {
  dbConfig.connect(() => {});
};

// Logger
Server.prototype.initLogger = () => {
  app.use(morgan("dev"));
};

Server.prototype.initRoutes = () => {
  app.use("/api", router);
  router.use("/enquiry", enquiry);

  // Always use error handling after routes.
  // Error handling.

  app.use((req, res, next) => {
    const error = new Error("Id not found");
    error.status = 404;
    next(error);
  });

  // Default errors send by database.
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message,
      },
    });
  });
};

const server = new Server();
