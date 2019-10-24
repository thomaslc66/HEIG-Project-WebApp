// src/models/credentials.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/******************
 *
 *     Schemas
 *
 ******************/
//Base Credentials Option
const credentialOptions = {
  discriminatorKey: '_type',
  collection: 'credentials'
};

// Base Credentials Schema
const CredentialSchema = new Schema(
  {
    login: { type: String },
    password: { type: String }
  },
  credentialOptions
);

/******************
 *
 *     Indexes
 *
 ******************/
CredentialSchema.index({
  login: 'text'
});

/******************
 *
 *     Export
 *
 ******************/
module.exports = mongoose.model('Credential', CredentialSchema);
