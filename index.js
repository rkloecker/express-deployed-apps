const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

require("dotenv").config();

var port = process.env.PORT || 3000;

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

const AppModel = require("./models/appModel");

// Connect to Mongoose
// const mongoURI = process.env.MLABKEY;
const mongoURI = process.env.MONGO_URI;
// const mongoURI = process.env.MONGO_LOCAL;

mongoose.connect(
  mongoURI,
  { useNewUrlParser: true }
);
var db = mongoose.connection;

//READ Single Record
app.get("/api/apps/:_id", (req, res) => {
  AppModel.findById({ _id: req.params._id }, (err, _app) => {
    if (err) {
      throw err;
    }
    res.json(_app);
  });
});

//READ All records
app.get("/api/apps", (req, res) => {
  AppModel.find((err, _apps) => {
    if (err) {
      throw err;
    }
    res.json(_apps);
  });
});

//CREATE an App
app.post("/api/apps", (req, res) => {
  if (!req.body) {
    return console.log("no body");
  }
  const _app = req.body;
  if (
    !_app.title ||
    !_app.description_long ||
    !_app.description_short ||
    !_app.url
  ) {
    return console.log(
      "no title or no description_long or no description_short or no url"
    );
  }

  AppModel.create(_app, (err, _app) => {
    if (err) {
      throw err;
    }
    res.json(_app);
  });
});

//UPDATE an App - use PUT when sending the whole entity - use PATCH when sending only fields that changed
app.put("/api/apps/:_id", (req, res) => {
  if (!req.body) {
    return console.log("no body");
  }
  const _app = req.body;
  if (
    !_app.title ||
    !_app.description_long ||
    !_app.description_short ||
    !_app.url
  ) {
    return console.log("no eng or no german or no description");
  }

  AppModel.findOneAndUpdate(
    { _id: req.params._id },
    req.body,
    {},
    (err, _app) => {
      if (err) {
        throw err;
      }
      res.json(_app);
    }
  );
});

//DELETE an App
app.delete("/api/apps/:_id", (req, res) => {
  if (!req.params._id) {
    return console.log("no id");
  }
  AppModel.remove({ _id: req.params._id }, (err, _app) => {
    if (err) {
      throw err;
    }
    res.json(_app);
  });
});

app.listen(port, () => console.log(`app is running on ${port}`));
