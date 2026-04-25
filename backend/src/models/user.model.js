const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email"],
  },

  password: {
    type: String,
    required: true,
    minlenght: 5,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [
      /^\+[1-9]\d{1,14}$/,
      "Please use valid phone number with country code",
    ],
  },
  profileImage: {
    type: String,
    required: true,
  },
} , {timestamps : true});

const User = mongoose.model("User", userSchema);
module.exports = User;
