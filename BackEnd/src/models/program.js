const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const findOrCreate = require('mongoose-findorcreate');

/******************
 *
 *     Schemas
 *
 ******************/
const programSchema = new Schema(
  {
    name: { type: String, unique: true },
    productor: { type: mongoose.Schema.Types.ObjectId, ref: 'Productor' },
    versions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Version' }]
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
programSchema.plugin(findOrCreate);
module.exports = mongoose.model('Program', programSchema);
