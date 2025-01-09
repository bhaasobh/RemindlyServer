const mongoose = require('mongoose');
const addressSchema = require('./addressModel'); // Correctly import addressSchema

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: addressSchema, required: true }, // Embed the addressSchema
  },
  { collection: 'users' }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
