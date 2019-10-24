const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const findOrCreate = require('mongoose-findorcreate');

/******************
 * 
 *     Schemas
 * 
 ******************/
const productorSchema = new Schema(
	{
		name: { type: String, unique: true }
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
productorSchema.plugin(findOrCreate);
module.exports = mongoose.model('Productor', productorSchema);
