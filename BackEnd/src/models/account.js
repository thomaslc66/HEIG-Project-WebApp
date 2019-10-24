const mongoose = require('mongoose');
const Credential = require('./credentials');
const Schema = mongoose.Schema;

module.exports = Credential.discriminator(
	'Account',
	new Schema({
		account: { type: String }
	})
);
