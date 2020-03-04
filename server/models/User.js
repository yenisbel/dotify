const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const currentYear = new Date().getFullYear();

const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  birthMonth: {
    type: String,
    required: true,
    enum: ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"]
  },
  birthYear: {
    type: Number,
    required: true,
    max: currentYear - 13,
    min: currentYear - 125
  },
  birthDay: {
    type: Number,
    required: true,
    max: 31,
    min: 1
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female", "Non-Binary"]
  }
});



module.exports = mongoose.model("users", UserSchema);