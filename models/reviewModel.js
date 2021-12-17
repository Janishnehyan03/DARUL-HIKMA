const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, "review cannot be empty"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
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
});
const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
