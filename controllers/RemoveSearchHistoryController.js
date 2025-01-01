const User = require("../models/userModel");
const RemoveSearchHistoryController = async (req, res) => {
  try {
    const { searchUser } = req.body;
    const result = await User.updateOne(
      { _id: req.user.user },
      {
        $pull: {
          search: {
            user: searchUser,
          },
        },
      }
    );
    if (result.modifiedCount > 0) {
      return res.json({ message: "ok" });
    } else {
      return res.json({ message: "Not found" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
module.exports = RemoveSearchHistoryController;
