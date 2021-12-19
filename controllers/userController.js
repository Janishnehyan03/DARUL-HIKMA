const User = require("../models/userModel");
const AppError = require("../utils/appError");
const { promisify } = require("util");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const Review = require("../models/reviewModel");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

//send token and set cookie in browser
const sendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);
  let expireTime = 7889400000; // 3 months
  const cookieOptions = {
    maxAge: expireTime,
    httpOnly: true,
  };
  res.cookie("jwt", token, cookieOptions);
  // remove password from output
  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    expireTime: expireTime,
    token,
    data: user,
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const { username, email, password, passwordConfirm } = req.body;
  if (!username || !email || !password || !passwordConfirm) {
    return next(new AppError("Please provide email and password", 400));
  }
  if (password !== passwordConfirm) {
    return next(new AppError("Passwords do not match", 400));
  }
  let userData = await User.create(req.body);
  res.status(201).json({
    status: "success",
    userData,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect Email Or Password", 401));
  }
  if (user.activated === false) {
    return next(
      new AppError("account is not activated, please contact admin", 401)
    );
  }
  sendToken(user, 200, req, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new AppError("You are not logged in", 401));
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError("The user belonging to this token does no longer exist", 401)
    );
  }
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});
exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    status: "success",
    message: "logged out",
  });
};

exports.addReview = catchAsync(async (req, res, next) => {
  const review = await Review.create({
    user: req.user._id,
    ...req.body,
  });
  res.status(201).json({
    status: "success",
    review,
  });
});
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find().sort({ activated: false, createdAt: -1 });
  res.status(200).json({
    status: "success",
    users,
  });
});
exports.activateUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) return next(new AppError("No user found with that ID", 404));
  await User.findByIdAndUpdate(req.params.id, { activated: true });

  res.status(200).json({
    status: "success",
    user,
  });
});
exports.deactivateUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) return next(new AppError("No user found with that ID", 404));
  await User.findByIdAndUpdate(req.params.id, { activated: false });
  res.status(200).json({
    status: "success",
    user,
  });
});
