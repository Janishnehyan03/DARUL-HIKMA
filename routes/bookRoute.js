const router = require("express").Router();
const bookController = require("../controllers/bookController");
const authController = require("../controllers/authController");

// get all  book
router.get("/", bookController.getAllBooks);
router.route("/category").get(bookController.getAllCategory);
router.get("/language/:language", bookController.getAllLanguages);
router.get('/most-liked', bookController.getMostLiked);
// get singe / delete single / edit  book
router
  .route("/book/:id")
  .get(bookController.getBook)
  .patch(authController.protect, bookController.editBook)
  .delete(authController.protect, bookController.deleteBook);

// Add new book
router.delete(
  "/category/:id",
  authController.protect,
  bookController.deleteCategory
);
router.patch(
  "/category/:id",
  authController.protect,
  bookController.editCategory
);
router.post("/category", authController.protect, bookController.createCategory);

router.post(
  "/upload/files",
  authController.protect,
  bookController.resizeImages,
  bookController.upload.fields([
    { name: "file", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  bookController.addNewBook
);
router.post(
  "/link",
  authController.protect,
  bookController.createLink
);
router.get("/link", bookController.getAllLinks);
router.get("/link/:id", bookController.getLink);
router.delete("/link/:id", authController.protect, bookController.deleteLink);
router.patch("/link/:id", authController.protect, bookController.updateLink);
router.post(
  "/sub-category",
  authController.protect,
  bookController.createSubCategory
);
router.delete(
  "/sub-category/:id",
  authController.protect,
  bookController.deleteSubCategory
);
router.get("/sub-category", bookController.getAllSubCategory);
// student corner
router.post(
  "/student-corner/",
  authController.protect,
  bookController.addStudentCorner
);
router.get("/student-corner", bookController.getAllStudentCorner);
router.delete(
  "/student-corner/:id",
  authController.protect,
  bookController.deleteStudentCorner
);
router.patch(
  "/student-corner/:id",
  authController.protect,
  bookController.updateStudentCorner
);

// issues
router.post("/issues", bookController.addIssue);
router.get("/issues", bookController.getAllIssues);
router.delete("/issues/:id", bookController.deleteIssue);

// feedback
router.post("/feedback", bookController.addFeedback);
router.get("/feedback", bookController.getAllFeedbacks);
router.delete("/feedback/:id", bookController.deleteFeedback);

module.exports = router;
