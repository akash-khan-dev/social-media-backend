const User = require("../models/userModel");
const PostModel = require("../models/Post");

const getUserController = async (req, res, next) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username: username }).select("-password");
    if (!user) {
      return res.json({ message: "User not found", ok: false });
    }

    const post = await PostModel.find({ user: user._id })
      .populate("user")
      .sort({ createdAt: -1 });
    return res.status(200).json({ ...user.toObject(), post });
  } catch (e) {
    return res.status(500).json({ message: e.message, ok: false });
  }
};
module.exports = getUserController;
