const Video = require("../models/videoModel");
const factory = require("../controllers/handlerFactory");

exports.getAllVideos = factory.getAll(Video);
exports.getOneVideo = factory.getOne(Video);
exports.deleteVideo = factory.deleteOne(Video);
exports.createVideo = factory.createOne(Video);
exports.updateVideo = factory.updateOne(Video);


// const multer = require("multer");
// const fs = require("fs");
// const { promisify } = require("util");
// const unlinkAsync = promisify(fs.unlink);

// //video upload
// const videoStorage = multer.diskStorage({
//   destination: "./public/uploads", // Destination to store video
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       file.fieldname + "_" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });
// exports.videoUpload = multer({
//   storage: videoStorage,
//   limits: {
//     // fileSize: 10000000, // 10000000 Bytes = 10 MB
//   },
//   fileFilter(req, file, cb) {
//     // upload only mp4 and mkv format
//     // if (!file.originalname.match(/\.(mp4|MPEG-4|mkv)$/)) {
//     //   return cb(new Error("Please upload a video"));
//     // }
//     cb(undefined, true);
//   },
// });

// exports.addVideo = catchAsync(async (req, res) => {
//   console.log(req.files);
//   let videoData = await Video.create({
//     title: req.body.title,
//     thumbnail: req.files.thumbnail[0].originalname,
//     video: req.files.video[0].originalname,
//   });
//   res.status(200).json(videoData);
// });
// exports.deleteFromDisk = catchAsync(async (req, res) => {
//   await unlinkAsync(req.file.path);
// });
