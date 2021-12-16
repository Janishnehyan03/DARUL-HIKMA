const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto"); //build in module to create random token (reset password)
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name"],
    maxlength: [70, "Only accept 70 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  role: {
    type: String,
    enum: ["admin", "user", "lead-guide", "guide"],
    default: "user",
  },
  photo: {
    type: String,
    default: "default.jpg",
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    // minlength: [8, "Enter atleast 8 charaters"],
    maxlength: [100, "Password should be below 100 characters"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Confirm your password "],
    validate: {
      validator: function (el) {
        return el === this.password; // passwordConfrim should equal to password ,Only works in .create() or .save()
      },
      message: "Passwords are not same",
    },
  },
  passwordChangedAt: Date, //this will be created if a user change his password
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

//BCRYPT
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});
//Password ChangedAt...
userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000; //changed at past😊
  next();
});
//when make user active:false
userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});
// bcrypt compare
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changePasswordAfter = function (JWTTimestamp) {
  //a user changed his password after the JWT token sent
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimeStamp; //eg: jwt Issued at (1:00 am) and passwordChanged at (1:02 am)
    //return value (true)
  }
  return false; //false means:"password not changed"
};

// reset token
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex"); //create a normal string
  this.passwordResetToken = crypto //convert the resetToken to encrypted
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; //expires in 10 minutes
  return resetToken;
};
const User = mongoose.model("User", userSchema);
module.exports = User;