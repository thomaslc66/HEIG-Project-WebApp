const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ContactModel = require('./contact');

module.exports = ContactModel.discriminator('Supplier', new Schema({}));
