const catchAsync = require("./catchAsync");
const passport = require("passport");

exports.login = catchAsync(async (req, res,next) => {
  passport.authenticate("local", {
    successRedirect: "https://darul-hikma.netlify.app/dashboard",
    failureRedirect: "https://darul-hikma.netlify.app/login",
  })(req, res, next);
});
