const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const userModel = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      text: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      text: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    cover: {
      type: String,
      trim: true,
    },
    bMonth: {
      type: Number,
      required: true,
      trim: true,
    },
    bDay: {
      type: Number,
      required: true,
      trim: true,
    },
    bYear: {
      type: Number,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    friends: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    followers: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    request: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    search: [
      {
        user: {
          type: ObjectId,
          ref: "User",
          required: true,
          text: true,
        },
        createdAt: {
          type: Date,
          required: true,
        },
      },
    ],
    details: {
      bio: {
        type: String,
      },
      nickname: {
        type: String,
      },
      job: {
        type: String,
      },
      currentCity: {
        type: String,
      },
      workPlace: {
        type: String,
      },
      highSchool: {
        type: String,
      },
      collage: {
        type: String,
      },
      varsity: {
        type: String,
      },
      homeTown: {
        type: String,
      },
      relationship: {
        type: String,
        enum: [
          "Singe,",
          "In a Relationship",
          "Married",
          "it's Complicated",
          "Divorce",
        ],
      },
      instagram: {
        type: String,
      },
    },
    savePost: [
      {
        post: {
          type: ObjectId,
          ref: "Post",
        },
        saveAt: {
          type: Date,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userModel);
module.exports = User;
