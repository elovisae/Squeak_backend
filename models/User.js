const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: false,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: false,
    },
    phone: {
      type: String,
      required: false,
      unique: false,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", UserSchema);
