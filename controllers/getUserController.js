const User = require("../models/userModel");

const getUserController = async (req, res, next) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username: username }).select("-password");
    return res.status(200).json({ user: user });
  } catch (e) {
    return res.status(404).json({ message: e.message });
  }
};
module.exports = getUserController;
