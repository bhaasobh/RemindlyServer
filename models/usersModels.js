const {mongoose, Collection}= require('mongoose');

const userSchema = new mongoose.Schema({
    username : {type : String , required : true,unique: true},
    password :{type : String , required : true},
    address : {type : String,required:true}
},
{collection :'users'});

const User = mongoose.model('User',userSchema);

module.exports = User;