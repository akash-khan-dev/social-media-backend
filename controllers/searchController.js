const User = require("../models/userModel");
const searchController = async (req, res) => {
  try {
    const searchTerm = req.params.searchTerm;
    const search = await User.find({ $text: { $search: searchTerm } }).select(
      "firstName lastName username profilePicture"
    );
    return res.json(search);
  } catch (error) {
    return res.status(404).send({ message: error.message });
  }
};

module.exports = searchController;
