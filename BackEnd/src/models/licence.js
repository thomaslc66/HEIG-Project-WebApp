const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/******************
 *
 *     Schemas
 *
 ******************/
const licenceSchema = new Schema(
  {
    buyDate: Date,
    programRef: {
      program: { type: mongoose.Schema.Types.ObjectId, ref: 'Program' },
      version: { type: mongoose.Schema.Types.ObjectId, ref: 'Version' },
      productor: { type: mongoose.Schema.Types.ObjectId, ref: 'Productor' }
    },
    key: String,
    computer: String,
    type: String
  },
  // used to delete _v in mongoose object
  {
    versionKey: false
  }
);

/******************
 *
 *     Schemas
 *
 ******************/

module.exports = mongoose.model('Licence', licenceSchema);
