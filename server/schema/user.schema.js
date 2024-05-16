const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: String, 
    password: String,
    email: String, 
    profileImg: String, 
    balance: Number, 
    role: String, 
    basketItems: Array
},{timestamps:true});

module.exports =UserSchema