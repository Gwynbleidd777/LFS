// models/profileInfo.js
const mongoose = require("mongoose");

const profileInfoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Reference to the User model
  },
  address: { type: String, default: "" },
  phoneNumber: { type: String, default: "" },
  dob: { type: Date },
  gender: { type: String },
  department: { type: String }
});

const ProfileInfo = mongoose.model("ProfileInfo", profileInfoSchema);

module.exports = ProfileInfo;
