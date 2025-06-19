const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userName: { type: String },
  email: { type: String },
  photo: { type: String },
  mediaName: { type: String },
});

module.exports = mongoose.model("UserMediaProfile", profileSchema);
