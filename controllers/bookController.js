const mongoose = require("mongoose");
const multer = require("multer");
const { Book, SubCategory, Issues, Feedbacks } = require("../models/bookModel");
const sharp = require("sharp");
const factory = require("../controllers/handlerFactory");
const catchAsync = require("../utils/catchAsync");
//...............................//
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: [true, "Already created"],
    required: [true, "Please enter category  name"],
    uppercase: true,
  },
});
categorySchema.set("timestamps", true);
const Category = mongoose.model("Categories", categorySchema);
//...............................//
const linkSchema = new mongoose.Schema({
  url: {
    required: [true, "Please provide a URL"],
    type: String,
    unique: [true, "Already added"],
  },
  name: {
    type: String,
    required: [true, "Please provide a name"],
    unique: [true, "Already added"],
  },
  details: {
    type: String,
    required: [true, "Please provide a description"],
  },
  addedBy: String,
});
linkSchema.set("timestamps", true);
const Links = mongoose.model("links", linkSchema);
//...............................//
const studentCornerSchema = new mongoose.Schema({
  title: {
    required: [true, "Please provide a title"],
    type: String,
  },
  author: {
    type: String,
    required: [true, "Please provide an author"],
  },
  details: {
    type: String,
    required: [true, "Please provide details"],
  },
  addedBy: String,
});
studentCornerSchema.set("timestamps", true);
const Students = mongoose.model("Students", studentCornerSchema);

exports.editBook = factory.updateOne(Book);
exports.getAllBooks = factory.getAll(Book);
exports.getMostLiked = async (req, res) => {
  const mostLiked = await Book.aggregate([
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "book",
        as: "likes",
      },
    },
    {
      $unwind: "$likes",
    },
    {
      $group: {
        _id: "$_id",
        likes: { $sum: 1 },
      },
    },
    {
      $sort: { likes: -1 },
    },
  ]);
  res.status(200).json({
    status: "success",
    data: mostLiked,
  });
};

exports.getBook = factory.getOne(Book);
exports.deleteBook = factory.deleteOne(Book);
exports.createCategory = factory.createOne(Category);
exports.getAllCategory = factory.getAll(Category);
exports.deleteCategory = factory.deleteOne(Category);
exports.editCategory = factory.updateOne(Category);
exports.getAllLanguages = async (req, res) => {
  let query = req.params.language;
  console.log(query);
  const languages = await Book.find({ category: { $regex: query } }).sort({
    likes: -1,
  });
  res.status(200).json({
    status: "success",
    length: languages.length,
    data: languages,
  });
};
// add new book
//resize with sharp
exports.resizeImages = async (req, res, next) => {
  if (!req.files) return next();
  req.body.images = [];
  await Promise.all(
    req.files.map(async (file) => {
      const newFilename = "";

      await sharp(file.buffer)
        .resize(640, 320)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`upload/${newFilename}`);
      req.body.images.push(newFilename);
    })
  );

  next();
};
let path = "./public/";

// storage for files
const storage = multer.diskStorage({
  // destination
  destination: (req, file, cb) => {
    cb(null, path);
  },
  // add back the extension
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
exports.upload = multer({
  storage: storage,
});

exports.addNewBook = catchAsync(async (req, res) => {
  if (!req.body.SubCategory) req.body.SubCategory === req.body.author;
  if (!req.body.author) req.body.author = "";
  let bookData = await Book.create({
    file: req.files.file[0].originalname,
    thumbnail: req.files.thumbnail[0].originalname,
    title: req.body.title,
    category: req.body.category,
    author: req.body.author,
    addedBy: req.user.email,
    SubCategory: req.body.SubCategory,
  });
  res.status(200).json({
    status: "success",
    bookData,
  });
});

exports.createLink = async (req, res) => {
  console.log(req.user);
  try {
    let bookData = await Links.create({
      url: req.body.url,
      name: req.body.name,
      addedBy: req.user.email,
      details: req.body.details,
    });
    res.status(200).json({
      status: "success",
      bookData,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getAllLinks = factory.getAll(Links);
exports.getLink = factory.getOne(Links);
exports.updateLink = factory.updateOne(Links);
exports.deleteLink = factory.deleteOne(Links);

exports.createSubCategory = factory.createOne(SubCategory);
exports.deleteSubCategory = factory.deleteOne(SubCategory);
exports.getAllSubCategory = factory.getAll(SubCategory);
// student corner
exports.addStudentCorner = async (req, res) => {
  console.log(req.user);
  try {
    let studentData = await Students.create({
      title: req.body.title,
      author: req.body.author,
      details: req.body.details,
      addedBy: req.user.email,
    });
    res.status(200).json({
      status: "success",
      studentData,
    });
  } catch (error) {
    console.log(error);
  }
};
exports.getAllStudentCorner = factory.getAll(Students);
exports.updateStudentCorner = factory.updateOne(Students);
exports.deleteStudentCorner = factory.deleteOne(Students);
// issues
exports.addIssue = factory.createOne(Issues);
exports.getAllIssues = factory.getAll(Issues);
exports.deleteIssue = factory.deleteOne(Issues);

// feedbacks
exports.addFeedback = factory.createOne(Feedbacks);
exports.getAllFeedbacks = factory.getAll(Feedbacks);
exports.deleteFeedback = factory.deleteOne(Feedbacks);
