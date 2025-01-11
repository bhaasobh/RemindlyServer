const mongoose = require('mongoose');
const addressSchema = require('./addressModel'); // Correctly import addressSchema

const personalItemSchema = new mongoose.Schema(
  {
    address: { type: addressSchema, required: true }, 
    itemName:{type:String,required:true}
  }
);

const PersonalItem = mongoose.model('PersonalItem', personalItemSchema);

module.exports = PersonalItem;
