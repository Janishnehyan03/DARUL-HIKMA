const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const globalErrorHandler = require("./controllers/errorController");
const bookRoute = require("./routes/bookRoute");
const authRoute = require("./routes/authRoute");
const paymentRoute = require("./routes/paymentRoute");
const videoRoute = require("./routes/videoRoute");

const app = express();
app.use(cookieParser()); //reads cookie

//middlewares
// app.use(helmet()); //set security HTTP

app.use(morgan("dev"));

//view engine
app.set("view engine", "pug");
// app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));



//Route
app.use("/api/v1/book", bookRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1/video", videoRoute);
console.log(process.env.NODE_ENV);

// app.all("*", (req, res, next) => {
//   // * stand for every routes
//   // const err = new Error(`Cant find ${req.originalUrl} on the server`);
//   // err.status = "fail";
//   // err.statusCode = 404;
//   next(new AppError(`Cant find ${req.originalUrl}  on the server`, 404));
// });

//set static folder

app.use(express.static("public"));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname + "/client/build/index.html"));
// });

app.use(globalErrorHandler);

module.exports = app;
