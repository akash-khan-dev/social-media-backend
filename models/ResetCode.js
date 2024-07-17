const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const resetCode = new Schema({
  code: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = model("ResetCode", resetCode);
