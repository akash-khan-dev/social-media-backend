const User = require("../models/userModel");
const resetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email }).select("-password");
    if (!user) {
      return res.status(400).json({ message: "Email does't exist" });
    }
    return res.status(200).json({
      email: user.email,
      profilePicture: user.profilePicture,
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
module.exports = resetPassword;
