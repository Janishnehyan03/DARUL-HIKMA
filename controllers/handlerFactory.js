const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/apiFeatures");
exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError(`No document found in this ID`, 404));
    }
    res.status(204).json({
      message: "deleted",
      data: null,
    });
  });
exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      return next(new AppError("no document found in this ID", 404));
    }
    res.status(200).json({
      status: "success",
      message: "updated",
      data: {
        data: doc,
      },
    });
  });

exports.createOne = (model) =>
  catchAsync(async (req, res, next) => {
    const doc = await model.create(req.body);
    res.status(201).json({
      status: "success",
      doc,
    });
  });

exports.getOne = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (populateOptions) query = query.populate(populateOptions); //check on the tourSchema
    const doc = await query;
    console.log(doc);
    if (!doc) {
      return next(new AppError("no document found in this ID", 404));
    }
    res.status(200).json({
      results: doc.length,
      data: doc,
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    let filter = {}; // to allow for nested getReviews on single tour
    if (req.params.tourId) filter = { tour: req.params.tourId };
    //EXECUTE THE QUERY
    const features = new APIFeatures(Model.find(filter), req.query) //[Tour.find()] is the queryObj & [req.query] is queryString
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const doc = await features.query;
    //SEND RESPONSE
    res.status(200).json({
      results: doc.length,
      data: doc,
    });
  });
