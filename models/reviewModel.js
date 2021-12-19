const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, "review cannot be empty"],
  },
  book: {
    type: mongoose.Schema.ObjectId,
    ref: "Book", //REFERENCING
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User", //REFERENCING
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  likes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
});
const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
