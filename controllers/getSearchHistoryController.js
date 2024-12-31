const User = require("../models/userModel");
const getSearchHistoryController = async (req, res) => {
  try {
    const getSearch = await User.findById(req.user.user)
      .select("search")
      .populate("search.user", "firstName lastName username profilePicture");
    return res.json(getSearch);
  } catch (error) {
    return res.status(404).send({ message: error.message });
  }
};

module.exports = getSearchHistoryController;
