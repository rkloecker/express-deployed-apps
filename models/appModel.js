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
  repo_url: {
    type: String
  },
  create_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("App", appSchema);
