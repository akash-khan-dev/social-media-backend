const User = require("../models/userModel");

const followController = async (req, res, next) => {
  try {
    const { senderId } = req.body;
    const receiverId = req.params.id;
    if (senderId !== receiverId) {
      let sender = await User.findById(senderId);
      let receiver = await User.findById(receiverId);
      if (
        !receiver.followers.includes(sender._id) &&
        !sender.following.includes(receiver._id)
      ) {
        await receiver.updateOne({
          $push: { followers: sender._id },
        });
        await sender.updateOne({
          $push: { following: receiver._id },
        });

        return res.json({ message: "Successfully Follow" });
      } else {
        return res.json({ message: "Already followed" });
      }
    } else {
      return res.json({ message: "you can't follow to you self" });
    }
  } catch (error) {
    return res.json({ message: error.message });
  }
};
module.exports = followController;
