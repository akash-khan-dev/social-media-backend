const User = require("../models/userModel");

const unFriendController = async (req, res, next) => {
  try {
    const { senderId } = req.body;
    const receiverId = req.params.id;
    if (senderId !== receiverId) {
      let sender = await User.findById(senderId);
      let receiver = await User.findById(receiverId);
      if (
        sender.friends.includes(receiver._id) &&
        receiver.friends.includes(sender._id)
      ) {
        await receiver.update({
          $pull: {
            friends: sender._id,
            following: sender._id,
            followers: sender._id,
          },
        });
        await sender.update({
          $pull: {
            friends: receiver._id,
            following: receiver._id,
            followers: receiver._id,
          },
        });

        return res.json({ message: " Unfriend" });
      } else {
        return res.json({ message: "Already Unfriend" });
      }
    } else {
      return res.json({ message: "you can't Unfriend to you self" });
    }
  } catch (error) {
    return res.json({ message: error.message });
  }
};
module.exports = unFriendController;