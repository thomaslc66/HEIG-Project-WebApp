const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schema = new Schema(
  {
    id: {
      type: String
    },
    login: String,
    password: String
  },
  // used to delete _v in mongoose object
  {
    versionKey: false
  }
);

module.exports = mongoose.model("password", schema);
