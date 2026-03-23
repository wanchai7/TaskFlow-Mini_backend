const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const UserSchema = new Schema(
  {
    fullName: { type: String, required: true,},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, min: 4 },
    phone: { type: String, required: true },
    profilePic: { type: String, default: "" },
    theme: { type: String, default: "dark" },
  },
  {
    timestamps: true,
  }
);
const UserModel = model("User", UserSchema);
module.exports = UserModel;
