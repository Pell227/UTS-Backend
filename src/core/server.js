const routes = require("../api/router");
const cors = require("cors");
const express = require("express");
const errorHandler = require("./error_handler");

const app = express();
const config = require("./config");
const { errorResponder, errorTypes } = require("./error");
const bodyparser = require("body-parser");
const logger = require("../api/components/utils/logger");

app.enable("trust proxy");

app.use(cors());

app.use(bodyparser.json());

app.use(bodyparser.urlencoded({ extended: false }));

app.use(`${config.api.prefix}`, routes());

app.use((request, response, next) =>
  next(errorResponder(errorTypes.ROUTE_NOT_FOUND, "Route not found")),
);

app.use((error, request, response, next) => {
  const ctx = {
    code: error.code,
    status: error.status,
    description: error.description,
  };

  if (error.stack) {
    ctx.stack = error.stack;
  }

  logger.error(ctx, error.toString());

  return next(error);
});

app.use((error, request, response, next) =>
  response.status(error.status || 404).json({
    statusCode: error.status || 404,
    error: error.code || "UNKNOWN_ERROR",
    description: error.description || "Unknown error",
    message: error.message || "An error has occurred",
  }),
);

module.exports = app;
