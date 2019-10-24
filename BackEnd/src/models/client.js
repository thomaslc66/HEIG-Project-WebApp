const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ContactModel = require('./contact');
const Licence = require('./licence');

module.exports = ContactModel.discriminator(
	'Client',
	new Schema({
		licences: [Licence.schema]
	})
);
