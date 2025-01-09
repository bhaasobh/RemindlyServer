const {mongoose, Collection}= require('mongoose');
const addressSchema = require('./addressModel');

const reminderSchema = new mongoose.Schema({
   reminderType : {type : String},
   title: {type : String},
    address: { type: addressSchema, required: true },
   radius:{type : Number , default:200},
  time:{type : Date ,  default: Date.now },
   Details:{type : String}
},
{collection :'Reminders'});

const Reminder = mongoose.model('Reminder',reminderSchema);

module.exports = Reminder;