const router = require("express").Router();
const videoController = require("../controllers/videoController");
const authController = require("../controllers/authController");

router.get("/", videoController.getAllVideos);
router.get("/:id", videoController.getOneVideo);

router.use(authController.protect);
router.post("/", videoController.createVideo);
router
  .route("/:id")
  .patch(videoController.updateVideo)
  .delete(videoController.deleteVideo);

module.exports = router;

// router.post(
//   "/upload",
//   bookController.resizeImages,
//   videoController.videoUpload.fields([
//     { name: "video", maxCount: 1 },
//     { name: "thumbnail", maxCount: 1 },
//   ]),

// );

// router.delete("/delete/:id", videoController.deleteVideo,videoController.deleteFromDisk);
