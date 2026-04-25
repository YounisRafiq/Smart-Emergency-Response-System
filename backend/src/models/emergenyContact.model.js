const mongoose = require("mongoose");

const emergencyContactSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      match: [/^\+[1-9]\d{1,14}$/, "Invalid phone"],
    },
    relation: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const emergencyContact = mongoose.model("EmergencyContact" , emergencyContactSchema);
module.exports = emergencyContact;