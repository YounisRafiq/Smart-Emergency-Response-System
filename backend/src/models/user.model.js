const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName : {
        type : String,
        required : true
    },

    email : {
        type : String,
        required : true,
        unique : true,
    },

    password : {
        type : String,
        required : true,
        minLenght : 5
    },
    gender : {
        type : String,
        enum : ["male" , "female" , "other"],
        required : true
    },
    profileImage : {
        type : String,
        required : true
    }
});

const User = mongoose.model("User" , userSchema);
module.exports = User;