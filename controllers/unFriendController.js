const User = require("../models/userModel");

const unFriendController = async (req, res, next) => {
  try {
    const senderId = req.user.user;
    const receiverId = req.params.id;
    if (senderId !== receiverId) {
      let sender = await User.findById(senderId);
      let receiver = await User.findById(receiverId);
      if (
        sender.friends.includes(receiver._id) &&
        receiver.friends.includes(sender._id)
      ) {
        await User.findByIdAndUpdate(
          receiver._id,
          {
            $pull: {
              friends: sender._id,
              following: sender._id,
              followers: sender._id,
            },
          },
          { new: true }
        );
        await User.findByIdAndUpdate(
          sender._id,
          {
            $pull: {
              friends: receiver._id,
              following: receiver._id,
              followers: receiver._id,
            },
          },
          { new: true }
        );

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
