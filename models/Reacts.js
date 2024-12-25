const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const Reacts = new Schema({
  react: {
    type: String,
    enum: ["like", "love", "haha", "angry", "wow", "sad"],
    required: true,
  },
  postRef: {
    type: Schema.Types.ObjectId,
    ref: "PostModel",
    required: true,
  },
  reactBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = model("React", Reacts);
