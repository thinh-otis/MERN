"use strict";

var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: String,
  profilePic: String,
  role: String
}, {
  timestamps: true
});
var userModel = mongoose.model("user", userSchema);
module.exports = userModel;