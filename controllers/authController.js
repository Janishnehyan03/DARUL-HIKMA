const { promisify } = require("util");
const Auth = require("../models/authModel");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const crypto = require("crypto");
const Email = require("../utils/email");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    //payload and secret
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
exports.createUser = catchAsync(async (req, res, next) => {
  const newUser = await Auth.create(req.body);
  // const url = `${req.protocol}://${req.get("host")}/me`;
  Email.sendWelcomeEmail({
    email: newUser.email,
    url: "https://darul-hikma.netlify.app/",
    firstname: newUser.name,
  });
  // sendToken(newUser, 200, req, res);
  res.status(200).json(newUser);
});

exports.login = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const { email, password } = req.body;
  // 1) check email and password exist?
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }
  // 2) check if user exist and password is correct
  const user = await Auth.findOne({ email }).select("+password"); //get back the password to unhide
  //this function is from userModel
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect Email Or Password", 401));
  }
  // 3) if everything ok, send token to client
  sendToken(user, 200, req, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) GET TOKEN, CHECK IF IT EXIST
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(
      new AppError("You are not logged in, please login to get access", 401)
    );
  }
  // 2) TOKEN VERIFICATION
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET); //this will return a promise
  // 3) CHECK IF THE USER STILL EXISTS
  const currentUser = await Auth.findById(decoded.id); //This is not a new user, just console the "decoded", there will be an "id". checking the user's existance after verifying "token", and he did't change his password
  if (!currentUser) {
    return next(new AppError("User in this token no longer exist", 401));
  }
  // 4) CHECK IF USER CHANGE PASSWORD AFTER TOKEN ISSUED
  if (currentUser.changePasswordAfter(decoded.iat)) {
    // "iat" means: "ISSUED AT TIME", a timestamp
    return next(
      new AppError(
        "User recently changed the password, please login again",
        401
      )
    );
  }
  req.user = currentUser;
  res.locals.user = currentUser;
  next(); // Access to protected routes
});

// Restrict entry only for someone, like admin
exports.restrictTo = (...roles) => {
  // Roles are admin / lead guide
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You don't have permission to perform this action", 403)
      );
    }
    next();
  };
};

// forgot password
exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user by email
  const user = await Auth.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("No user found in this email", 404));
  }
  // 2) create random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  try {
    // 3 send to user's email
    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/v1/users/resetPassword/${resetToken}`;

    await new Email(user, resetUrl).sendPasswordReset();
    res.status(200).json({
      status: "success",
      message: "token sent to email !",
    });
  } catch (error) {
    console.log(error);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new AppError("there was an error in sending email", 500));
  }
});

//reset password
exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await Auth.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }, // check the token expired or not
  });
  // 2 if token not expires , set new password
  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();
  // 3) update changePasswordAt for the current user

  // 4) Login the user with JWT
  sendToken(user, 200, req, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await Auth.findById(req.user.id).select("+password");
  // 2) Check if Posted current password is correct
  if (!(await user.correctPassword(req.body.currentPassword, user.password))) {
    return next(new AppError("Your current password is wrong", 401));
  }
  // 3) if ok, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save(); // don't use findByIdAndUpdate() ⚠ ⚠, because of the "pre" middleware in userModel
  // 4) log user in, send JWT
  sendToken(user, 200, req, res);
});

//if there is no error, there will be a logged in user
exports.isLoggedIn = async (req, res, next) => {
  // 1) GET TOKEN, CHECK IF IT EXIST
  if (req.cookies.jwt) {
    try {
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      ); //this will return a promise
      // 2) CHECK IF THE USER STILL EXISTS
      const currentUser = await Auth.findById(decoded.id); //This is not a new user, just console the "decoded", there will be an "id". checking the user's existance after verifying "token", and he did't change his password
      if (!currentUser) {
        return next();
      }

      // 3) CHECK IF USER CHANGE PASSWORD AFTER TOKEN ISSUED
      if (currentUser.changePasswordAfter(decoded.iat)) {
        return next();
      }
      res.locals.user = currentUser;
      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};

//logout
exports.logout = (req, res) => {
  const cookieOptions = {
    maxAge: Date.now() + 1000,
  };
  try {
    res.cookie("jwt", cookieOptions);
    res.status(200).json({ status: "success" });
  } catch (error) {
    console.log(error);
  }
};
