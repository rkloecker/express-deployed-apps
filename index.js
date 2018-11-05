const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const appRoutes = require("./routes/app_routes");

require("dotenv").config();

var port = process.env.PORT || 3000;

// Connect to Mongoose
// const mongoURI = process.env.MLABKEY;
const mongoURI = process.env.MONGO_URI;
// const mongoURI = process.env.MONGO_LOCAL;

mongoose.connect(
  mongoURI,
  { useNewUrlParser: true }
);
var db = mongoose.connection;

// for frontend
app.use(express.static(__dirname + "/client"));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
  next();
});

// Routes which should handle requests
app.use("/api/apps", appRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

app.listen(port, () => console.log(`app is running on ${port}`));
