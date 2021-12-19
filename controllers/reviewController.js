const Review = require("../models/reviewModel");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");
const { Book } = require("../models/bookModel");
const AppError = require("../utils/appError");

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
exports.deleteReview = factory.deleteOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.likeBook = catchAsync(async (req, res, next) => {
  const book = await Book.findById(req.params.id);
  if (
    book.likes.filter((like) => like.toString() === req.user._id.toString())
      .length > 0
  ) {
    return next(new AppError("You have already liked this review", 400));
  }
  book.likes.push(req.user._id);
  await book.save();
  res.status(200).json({
    status: "success",
    data: {
      book,
    },
  });
});
exports.checkLiked = catchAsync(async (req, res, next) => {
  let Book = await Book.findById(req.params.id);
  if (
    Book.likes.filter((like) => like.toString() === req.user._id.toString())
  ) {
    console.log("liked");
  } else {
    console.log("not liked");
  }
});
