const User = require("../models/userModel");
const getAllFriendsController = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.user)
      .select("friends request")
      .populate("friends", "firstName lastName profilePicture username")
      .populate("request", "firstName lastName profilePicture username");
    //   if user send request part
    const userSendRequest = await User.find({
      request: req.user.user,
    }).select("firstName lastName profilePicture username");
    return res.json({
      friends: user.friends,
      request: user.request,
      userSendRequest,
    });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
module.exports = getAllFriendsController;
