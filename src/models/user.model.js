const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserModel = new Schema(
  {
    name: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserModel, "users");
