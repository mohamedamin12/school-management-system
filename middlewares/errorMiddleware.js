/* eslint-disable no-use-before-define */
const ApiError = require("../utils/apiError");

const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    sendErrForDev(err, res);
  } else {
    if (err.name === "JsonWebTokenError") err = handleJwtInvalidToken();
    sendErrForProd(err, res);
  }
};

const sendErrForDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrForProd = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

const handleJwtInvalidToken = () =>
  new ApiError("Invalid token ,please login", 401);

module.exports = errorMiddleware;