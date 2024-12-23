const User = require("../models/userModel");

const deleteRequestController = async (req, res, next) => {
  try {
    const senderId = req.user.user;
    const receiverId = req.params.id;
    if (senderId !== receiverId) {
      let receiver = await User.findById(senderId);
      let sender = await User.findById(receiverId);
      if (receiver.request.includes(sender._id)) {
        await receiver.update({
          $pull: {
            request: sender._id,
            followers: sender._id,
          },
        });
        await sender.update({
          $pull: {
            following: receiver._id,
          },
        });

        return res.json({ message: " Request Delete" });
      } else {
        return res.json({ message: "Already Delete" });
      }
    } else {
      return res.json({ message: "you can't Delete request you self" });
    }
  } catch (error) {
    return res.json({ message: error.message });
  }
};
module.exports = deleteRequestController;
