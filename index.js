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

mongoose.connect(
  mongoURI,
  { useNewUrlParser: true }
);
var db = mongoose.connection;

// //check valid with regex
// const isValid = (str) => {
// 	return !/[^a-zäöüß,-\s]/i.test(str);
// }

app.get("/", (req, res) => {
  res.send("Please use /api/apps");
});

//READ All records  or query if there is a query string
app.get("/api/apps", (req, res) => {
  AppModel.getApps((err, _apps) => {
    if (err) {
      throw err;
    }
    res.json(_apps);
  });
});

//READ Single Record
app.get("/api/apps/:_id", (req, res) => {
  AppModel.getAppById(req.params._id, (err, _app) => {
    if (err) {
      throw err;
    }
    res.json(_app);
  });
});

//CREATE
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
    return console.log("no eng or no german or no description");
  }

  AppModel.addApp(_app, (err, _app) => {
    if (err) {
      throw err;
    }
    res.json(_app);
  });
});

//UPDATE - use PUT when sending the whole entity - use PATCH when sending only fields that changed
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
  // console.log("update");
  // console.log(word);
  // console.log(req.params._id);
  AppModel.updateApp(req.params._id, _app, {}, (err, _app) => {
    if (err) {
      throw err;
    }
    res.json(_app);
  });
});

//DELETE
app.delete("/api/apps/:_id", (req, res) => {
  if (!req.params._id) {
    return console.log("no id");
  }
  const id = req.params._id;
  AppModel.removeApp(id, (err, _app) => {
    if (err) {
      throw err;
    }
    res.json(_app);
  });
});

app.listen(port, () => console.log(`app is running on ${port}`));
