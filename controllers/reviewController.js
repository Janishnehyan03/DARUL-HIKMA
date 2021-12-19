const Review = require("../models/reviewModel");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");
const { Book } = require("../models/bookModel");
const AppError = require("../utils/appError");

exports.writeReview = catchAsync(async (req, res, next) => {
  const review = await Review.create({
    comment: req.body.comment,
    book: req.body.book,
    user: req.user._id,
  });
  res.status(201).json({
    status: "success",
    data: review,
  });
});
exports.getReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find({ book: req.params.id })
    .populate({
      path: "user",
      select: "name",
    })
    .sort({ createdAt: -1 });
  console.log(reviews);
  res.status(200).json({
    status: "success",
    results: reviews.length,
    data: reviews,
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
exports.unlikeBook = catchAsync(async (req, res, next) => {
  const book = await Book.findById(req.params.id);
  if (
    book.likes.filter((like) => like.toString() === req.user._id.toString())
      .length === 0
  ) {
    return next(new AppError("You have not yet liked this review", 400));
  }
  const removeIndex = book.likes
    .map((like) => like.toString())
    .indexOf(req.user._id.toString());
  book.likes.splice(removeIndex, 1);
  await book.save();
  res.status(200).json({
    status: "success",
    data: {
      book,
    },
  });
});
