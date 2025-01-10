const {mongoose, Collection}= require('mongoose');
const addressSchema = require('./addressModel');

const reminderTimeSchema = new mongoose.Schema({
   reminderType : {type : String,default:"Time"},
   title: {type : String , required : true},
    address: { type: addressSchema},
  createTime:{type : Date ,  default: Date.now },
  Time:{type : Date ,required : true},
   Details:{type : String}
},
{collection :'TimeReminders'});

const ReminderTime = mongoose.model('ReminderTime',reminderTimeSchema);

module.exports = ReminderTime;