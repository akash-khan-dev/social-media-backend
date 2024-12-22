const User = require("../models/userModel");
const PostModel = require("../models/Post");

const getUserController = async (req, res, next) => {
  const { username } = req.params;
  const { userId } = req.body;
  try {
    const currentUser = await User.findById(userId);
    const getProfile = await User.findOne({ username: username }).select(
      "-password"
    );
    const friendShip = {
      friend: false,
      following: false,
      request: false,
      requestReceived: false,
    };
    if (!getProfile) {
      return res.json({ message: "User not found", ok: false });
    }

    if (
      currentUser.friends.includes(getProfile._id) &&
      getProfile.includes(currentUser._id)
    ) {
      friendShip.friend = true;
    }
    if (currentUser.following.includes(getProfile._id)) {
      friendShip.following = true;
    }
    if (getProfile.request.includes(currentUser._id)) {
      friendShip.request = true;
    }
    if (currentUser.request.includes(getProfile._id)) {
      friendShip.requestReceived = true;
    }
    const post = await PostModel.find({ user: getProfile._id })
      .populate("user")
      .sort({ createdAt: -1 });
    return res.status(200).json({ ...user.toObject(), post, friendShip });
  } catch (e) {
    return res.status(500).json({ message: e.message, ok: false });
  }
};
module.exports = getUserController;
