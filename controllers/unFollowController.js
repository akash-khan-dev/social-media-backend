const User = require("../models/userModel");

const unFollowController = async (req, res, next) => {
  try {
    const senderId = req.user.user;
    const receiverId = req.params.id;
    if (senderId !== receiverId) {
      let sender = await User.findById(senderId);
      let receiver = await User.findById(receiverId);
      if (
        receiver.followers.includes(sender._id) &&
        sender.following.includes(receiver._id)
      ) {
        await receiver.updateOne({
          $pull: { followers: sender._id },
        });
        await sender.updateOne({
          $pull: { following: receiver._id },
        });

        return res.json({ message: "Successfully  unFollow" });
      } else {
        return res.json({ message: "Already unFollowed" });
      }
    } else {
      return res.json({ message: "you can't unFollow to you self" });
    }
  } catch (error) {
    return res.json({ message: error.message });
  }
};
module.exports = unFollowController;
