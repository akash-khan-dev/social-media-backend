const User = require("../models/userModel");

const cancelRequestController = async (req, res, next) => {
  try {
    const senderId = req.user.user;
    const receiverId = req.params.id;
    if (senderId !== receiverId) {
      let sender = await User.findById(senderId);
      let receiver = await User.findById(receiverId);
      if (
        !receiver.friends.includes(sender._id) &&
        receiver.request.includes(sender._id)
      ) {
        await receiver.updateOne({
          $pull: { request: sender._id },
        });
        await receiver.updateOne({
          $pull: { followers: sender._id },
        });
        await sender.updateOne({
          $pull: { following: sender._id },
        });
        return res.json({ message: "Cancel Request Successful" });
      } else {
        return res.json({ message: "Already Cancel" });
      }
    } else {
      return res.json({ message: "you can't cancel questions to you self" });
    }
  } catch (error) {
    return res.json({ message: error.message });
  }
};
module.exports = cancelRequestController;
