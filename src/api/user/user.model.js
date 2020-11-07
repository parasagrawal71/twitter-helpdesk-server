const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String },
});

module.exports = mongoose.model("User", UserSchema, "users");
