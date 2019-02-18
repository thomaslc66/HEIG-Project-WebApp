const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const passwords = require("./password");

const schema = new Schema(
  {
    id: {
      type: String,
      index: {
        unique: true
      }
    },
    name: String,
    adress: String,
    logo: String,
    login: String,
    passwords: [passwords.schema],
    tags: Array
  },
  // used to delete _v in mongoose object
  {
    versionKey: false
  }
);

module.exports = mongoose.model("fournisseur", schema);
