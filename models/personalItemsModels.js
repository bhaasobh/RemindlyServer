const mongoose = require('mongoose');
const addressSchema = require('./addressModel'); // Correctly import addressSchema

const personalItemSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    address: { type: addressSchema, required: true }, 
    itemName:{type:String,required:true}
  },
  { collection: 'Personal Items' }
);

const User = mongoose.model('PersonalItem', personalItemSchema);

module.exports = User;
