const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const passwords = require('./password');

const schema = new Schema(
  {
    id: {
      type: String
    },
    name: String,
    url: String,
    logo: String,
    passwords: [passwords.schema],
    tags: Array
  },
  // used to delete _v in mongoose object
  {
    versionKey: false
  }
);

module.exports = mongoose.model('fournisseur', schema);
