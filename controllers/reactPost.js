const mongoose = require("mongoose");
const Reacts = require("../models/Reacts");
const User = require("../models/userModel");
const Reacts = require("../models/Reacts");
const reactPost = async (req, res) => {
  try {
    const { postId, react } = req.body;
    const userId = req.user.user;
    const check = await Reacts.findOne({
      postId: postId,
      reactBy: mongoose.Types.ObjectId(userId),
    });
    if (check === null) {
      const newReact = new Reacts({
        react: react,
        postRef: postId,
        reactBy: userId,
      });
      await newReact.save();
    } else {
      if (check.react === react) {
        await Reacts.findByIdAndDelete(check._id);
      } else {
        await Reacts.findByIdAndUpdate(check._id, { react: react });
      }
    }
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

module.exports = reactPost;
