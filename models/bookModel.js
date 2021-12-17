const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title for the file"],
    unique: [true, "Already uploaded"],
    uppercase: true,
  },
  category: {
    type: String,
    required: [true, "Please select a category"],
  },
  author: {
    type: String,
    required: [true, "Please provide an author"],
    uppercase: true,
  },
  file: String,
  thumbnail: String,
  video: String,
  addedBy: String,
  SubCategory: {
    type: String,
    default: "",
  },
});

bookSchema.set("timestamps", true);

const subCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for the sub category"],
    uppercase: true,
  },
  parentCategory: {
    type: String,
    required: [true, "Please select a parent category"],
  },
});

const issueSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title for the issue"],
    uppercase: true,
  },
  description: {
    type: String,
    required: [true, "Please provide a description for the issue"],
  },
  book: {
    type: mongoose.Schema.ObjectId,
    ref: "Book",
  },
});

const Issues = mongoose.model("Issues", issueSchema);
const SubCategory = mongoose.model("SubCategories", subCategorySchema);
const Book = mongoose.model("Book", bookSchema);

module.exports = { Book, SubCategory, Issues };
