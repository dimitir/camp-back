import express from "express";
import mongoose from "mongoose";
import bluebird from "bluebird";

mongoose.Promise = bluebird;
import env, { port, dbConnectionString, jwtSecret } from "./env";
import { initializeAuthentication } from "./service/auth";
import { applyRoutes } from "./utils";
import routes from "./service/index";
import { applyMiddleware } from "./utils";
import entry from "./middleware/entry";
import errorHandlers from "./middleware/errorHandlers";
import Logger from "./lib/logger";

import passportJWT from "passport-jwt";
import ExtractJwt = passportJWT.ExtractJwt;

const JWTStrategy = passportJWT.Strategy;

const logger = new Logger();

const app = express();

const startServer = () => {
  console.log(port);
  app.listen(port, () => console.log(`App started on port ${port}`));
};

const connectDb = () => {
  console.log("connect db");
  const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  };
  mongoose.connect(dbConnectionString as string, options);
  return mongoose.connection;
};

connectDb()
  .on("error", console.log)
  .on("disconnected", connectDb)
  .once("open", startServer);

applyMiddleware(entry, app);
applyMiddleware(errorHandlers, app);
initializeAuthentication(app);
applyRoutes(routes, app);

app.get('/user', function (req, res, next) {
    res.send('USER');
  });



process.on("uncaughtException", (e) => {
  logger.error("Error uncaughtException: ", e);
  process.exit(1);
});

process.on("unhandledRejection", (e) => {
  logger.error("Error unhandledRejection: ", e);
  process.exit(1);
});
