const User = require("../models/userModel");

const addFriendController = async (req, res, next) => {
  try {
    const senderId = req.user.user;
    const receiverId = req.params.id;
    if (senderId !== receiverId) {
      let sender = await User.findById(senderId);
      let receiver = await User.findById(receiverId);
      if (
        !receiver.friends.includes(sender._id) &&
        !receiver.request.includes(sender._id)
      ) {
        await receiver.updateOne({
          $push: { request: sender._id },
        });
        await receiver.updateOne({
          $push: { followers: sender._id },
        });
        await sender.updateOne({
          $push: { following: sender._id },
        });
        return res.json({ message: "Friend request has been send" });
      } else {
        return res.json({ message: "Already have a friend" });
      }
    } else {
      return res.json({ message: "you can't send questions to you self" });
    }
  } catch (error) {
    return res.json({ message: error.message });
  }
};
module.exports = addFriendController;
