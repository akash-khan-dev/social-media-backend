const User = require("../models/userModel");
const RemoveSearchHistoryController = async (req, res) => {
  try {
    const { searchUser } = req.body;
    await User.updateOne(
      { _id: req.user.user },
      {
        $pull: {
          search: {
            user: searchUser,
          },
        },
      }
    );
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
module.exports = RemoveSearchHistoryController;
