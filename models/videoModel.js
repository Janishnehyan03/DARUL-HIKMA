const mongoose = require("mongoose");
const videoSchema = new mongoose.Schema({
  url: {
    required: [true, "Please provide a URL"],
    type: String,
    unique: [true, "Already uploaded"],
  },
});
videoSchema.set("timestamps", true);

const Video = mongoose.model("Video", videoSchema);
module.exports = Video;
