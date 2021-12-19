const router = require("express").Router();
const reviewController = require("../controllers/reviewController");
const userController = require("../controllers/userController");

router.post(
  "/writeReview",
  userController.protect,
  reviewController.writeReview
);
router.post(
  "/deleteReview",
  userController.protect,
  reviewController.deleteReview
);
router.post(
  "/updateReview",
  userController.protect,
  reviewController.updateReview
);
router.post("/likeBook/:id", userController.protect, reviewController.likeBook);
router.post(
  "/unlikeBook/:id",
  userController.protect,
  reviewController.unlikeBook
);
module.exports = router;
