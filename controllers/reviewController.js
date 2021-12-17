const Review = require("../models/reviewModel");
const catchAsync = require("../utils/catchAsync");

exports.writeReview = catchAsync(async (req, res, next) => {
  const review = await Review.create({
    review: req.body.review,
    rating: req.body.rating,
    book: req.body.book,
    user: req.user._id,
  });
  res.status(201).json({
    status: "success",
    data: review,
  });
});
