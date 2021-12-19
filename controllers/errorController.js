const AppError = require("../utils/appError");

const handleCastErrorDB = (err) => {
  const message = `invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};
const handleDuplicateFieldsDB = (err) => {
  const message = `Already exist , please use another`;
  return new AppError(message, 400);
};
const handleValidationErrorDB = () => {
  const message = `invalid input data`;
  return new AppError(message, 400);
};
const handleJWTError = () => new AppError("Invalid token, please login ", 404);
const handleJWTExpiredError = (err) =>
  new AppError("your token expired, please try again", 401);

const sendErrorDev = (err, req, res) => {
  //API
  if (req.originalUrl.startsWith("/api")) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
  //RENDERED WEBSITE
  return res.status(err.statusCode).render("error", {
    title: "Something went wrong",
    msg: err.message,
  });
};
const sendErrorProd = (err, req, res) => {
  //API
  if (req.originalUrl.startsWith("/api")) {
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    //PROGRAMMING ERRORS
    console.error(err);
    return res.status(500).json({
      status: "error",
      message: "Something went wrong",
      err,
    });
  }
  //RENDERED WEBSITE
  if (err.isOperational) {
    console.log(err);
    return res.status(err.statusCode).render("error", {
      title: "Something went wrong",
      msg: err.message,
    });
  }
  // send generic message
  return res.status(err.statusCode).render("error", {
    title: "Something went wrong",
    msg: "Please try again later",
  });
};
module.exports = (err, req, res, next) => {
  //   console.log(err.stack);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === "production") {
    console.log(err);
    let error = { ...err };
    error.message = err.message;
    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === "ValidatorError") error = handleValidationErrorDB(error);
    if (error.name === "JsonWebTokenError") error = handleJWTError();
    if (error.name === "TokenExpiredError") error = handleJWTExpiredError();

    sendErrorProd(error, req, res);
  }
};
