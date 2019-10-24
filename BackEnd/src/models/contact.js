const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Account = require('./account');

/******************
 * 
 *     Schemas
 * 
 ******************/
const contactOptions = {
	discriminatorKey: '_type', // our discriminator key, could be anything
	collection: 'contact'
};

const contactSchema = new Schema(
	{
		id: {
			type: String
		},
		name: { type: String, unique: true },
		logo: String,
		phone: String,
		email: String,
		url: String,
		note: String,
		credentials: [Account.schema]
	},
	contactOptions
);

/******************
 * 
 *     Indexes
 * 
 ******************/
contactSchema.index({
	name: 'text'
});

/******************
 * 
 *     Export
 * 
 ******************/

module.exports = mongoose.model('Contact', contactSchema);
