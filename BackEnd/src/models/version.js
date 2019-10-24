const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const findOrCreate = require('mongoose-findorcreate');

/******************
 *
 *     Schemas
 *
 ******************/
const programVersionSchema = new Schema(
  {
    name: { type: String }
  }, // used to delete _v in mongoose object
  {
    versionKey: false
  }
);

/******************
 *
 *     Export
 *
 ******************/
programVersionSchema.plugin(findOrCreate);
module.exports = mongoose.model('Version', programVersionSchema);
