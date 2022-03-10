const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

//DB connection
mongoose.connect(process.env.MONGO_LOCAL, (err, data) => {
  if (err) console.log(`connection error`, err);
  else console.log("DB connected");
});

//server running
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
