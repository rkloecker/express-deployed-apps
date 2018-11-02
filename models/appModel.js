const mongoose = require("mongoose");

// Book Schema
const appSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description_long: {
    type: String,
    required: true
  },
  description_short: {
    type: String
  },
  url: {
    type: String
  },

  create_date: {
    type: Date,
    default: Date.now
  }
});

const AppModel = (module.exports = mongoose.model("App", appSchema));

// Get All Apps limit not used
module.exports.getApps = (callback, limit) => {
  AppModel.find(callback).limit(limit);
};

// Get All matching Apps for description
module.exports.getManyApps = (query, callback, limit) => {
  AppModel.find(query, callback).limit(limit);
};

// read sorted
module.exports.getAppsSorted = (q, callback) => {
  AppModel.find({}, null, { sort: q }, callback);
};

// query one App
module.exports.getSingleApp = (query, callback) => {
  AppModel.findOne(query, callback);
};

// Get Single App
module.exports.getAppById = (id, callback) => {
  AppModel.findById(id, callback);
};

// Add App
module.exports.addApp = (_app, callback) => {
  AppModel.create(_app, callback);
};

// Update App
module.exports.updateApp = (
  theId,
  { title, description_long, description_short, url },
  options,
  callback
) => {
  var query = { _id: theId };

  var update = {
    title,
    description_long,
    description_short,
    url
  };
  AppModel.findOneAndUpdate(query, update, options, callback);
};

// Delete App
module.exports.removeApp = (id, callback) => {
  var query = { _id: id };
  AppModel.remove(query, callback);
};
