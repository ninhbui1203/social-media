const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      uinique: true,
      lowercase: true,
      trim: true,
      maxLength: 25,
    },
    email: {
      type: String,
      required: true,
      uinique: true,
      lowercase: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      maxLength: 25,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "https://picsum.photos/400/400",
    },
    role: {
      type: String,
      default: "user",
    },
    gender: {
      type: String,
      default: "Male",
    },
    mobile: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    story: {
      type: String,
      default: "",
      maxLength: 255,
    },
    followers: [
      {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
    ],
    following: [
      {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
