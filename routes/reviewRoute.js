const router = require("express").Router();
const reviewController = require("../controllers/reviewController");
const authController = require("../controllers/authController");

router.post(
  "/writeReview",
  authController.protect,
  reviewController.writeReview
);

module.exports = router;
