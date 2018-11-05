const express = require("express");
const router = express.Router();

const AppModel = require("../models/appModel");

router.get("/:_id", (req, res, next) => {
  const _id = req.params._id;
  AppModel.findById({ _id })
    // .select('name price _id productImage')
    .exec()
    .then(doc => {
      // console.log(doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        let errormsg = `No valid entry found for provided ID ${req.params._id}`;
        // console.log(errormsg);
        res.status(404).json({ error: errormsg });
      }
    })
    .catch(err => {
      // this happens if _id is too short or long for a 'regular' Mongoose ObjectID
      // Argument passed in must be a single String of 12 bytes or a string of 24 hex characters
      console.log(err);
      res.status(500).json({ error: "no valid ID" });
    });
});

router.get("/", (req, res, next) => {
  AppModel.find()
    // .select("_id ...")
    .exec()
    .then(docs => {
      // console.log("docs", docs);
      //   if (docs.length >= 0) {
      res.status(200).json(docs);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/", (req, res, next) => {
  if (!req.body) {
    console.log("no body");
    return res.status(400).json({ message: "No body found" });
  }
  const _app = new AppModel(req.body);
  if (
    !_app.title ||
    !_app.description_long ||
    !_app.description_short ||
    !_app.url
  ) {
    console.log(
      "no title or no description_long or no description_short or no url"
    );
    return res.status(400).json({
      message:
        "all fields [title, description_long, description_short, url] needed"
    });
  }
  _app
    .save()
    .then(result => {
      // console.log(result);
      res.status(201).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.put("/:_id", (req, res, next) => {
  const _id = req.params._id;
  if (!req.body) {
    console.log("no body");
    return res.status(400).json({ message: "No body found" });
  }
  const _app = req.body;
  if (
    !_app.title ||
    !_app.description_long ||
    !_app.description_short ||
    !_app.url
  ) {
    console.log(
      "no title or no description_long or no description_short or no url"
    );
    return res.status(400).json({
      message:
        "all fields [title, description_long, description_short, url] needed"
    });
  }
  // new true returns the new doc, default is returning old one
  AppModel.findOneAndUpdate({ _id }, { $set: _app }, { new: true })
    .exec()
    .then(result => {
      if (result) {
        // console.log("updated: ", result);
        res.status(200).json(result);
      } else {
        // Object to update does not exist
        let errormsg = `No valid entry found for provided ID ${_id}`;
        console.log(errormsg);
        res.status(404).json({ error: errormsg });
      }
    })
    .catch(err => {
      // this happens if _id is too short or long for a 'regular' Mongoose ObjectID
      // Argument passed in must be a single String of 12 bytes or a string of 24 hex characters
      console.log(err);
      res.status(500).json({ error: "no valid ID" });
    });
});

router.delete("/:_id", (req, res, next) => {
  if (!req.params._id) {
    return console.log("no id");
  }
  const _id = req.params._id;
  AppModel.deleteOne({ _id })
    .exec()
    .then(doc => {
      // console.log(doc);
      if (doc.n == 1 && doc.ok == 1) {
        res.status(200).json(doc);
      } else {
        let errormsg = `No valid entry found for provided ID ${req.params._id}`;
        console.log(errormsg);
        res.status(404).json({ error: errormsg });
      }
    })
    .catch(err => {
      // this happens if _id is too short or long for a 'regular' Mongoose ObjectID
      // Argument passed in must be a single String of 12 bytes or a string of 24 hex characters
      console.log(err);
      res.status(500).json({ error: "no valid ID" });
    });
});

module.exports = router;
