const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const postModel = new Schema(
  {
    type: {
      type: String,
      enum: ["profilePicture", "cover", null],
      default: null,
    },
    images: {
      type: Array,
    },
    text: {
      type: String,
    },
    background: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    comments: [
      {
        text: {
          type: String,
        },
        image: {
          type: String,
        },
        commentedBy: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        commentedAt: {
          type: Date,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("PostModel", postModel);
