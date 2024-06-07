const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
   name:{
    type: String,
    required:true
   },
   email:{
    type: String,
    required:true
   },
   password:{
    type: String,
    required:true
   },
   role:{
    type: String,
   },
   profilepic:{
    type : String
   },
   date: { 
    type: Date, 
    default: Date.now },
})
const UserModel = mongoose.model('user',userSchema)
module.exports = UserModel