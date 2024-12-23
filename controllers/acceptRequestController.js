const User = require("../models/userModel");

const acceptRequestController = async (req, res, next) => {
  try {
    const senderId = req.user.user;
    const receiverId = req.params.id;
    if (senderId !== receiverId) {
      let receiver = await User.findById(senderId);
      let sender = await User.findById(receiverId);
      if (receiver.request.includes(sender._id)) {
        await receiver.update({
          $push: { friends: sender._id, following: sender._id },
        });
        await receiver.update({
          $push: { friends: receiver._id, followers: receiver._id },
        });
        await receiver.updateOne({
          $pull: { request: sender._id },
        });
        return res.json({ message: " Request friend" });
      } else {
        return res.json({ message: "Already Friend" });
      }
    } else {
      return res.json({ message: "you can't accept as to you seltion" });
    }
  } catch (error) {
    return res.json({ message: error.message });
  }
};
module.exports = acceptRequestController;
