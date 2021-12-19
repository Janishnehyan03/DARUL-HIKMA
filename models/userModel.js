const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please add a username"],
    trim: true,
  },
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    trim: true,
    lowercase: true,
    unique: [true, "Email already exists"],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please add a password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
    },
  },
  activated: {
    type: Boolean,
    default: false,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  reviews: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Review",
    },
  ],
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
