const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const changePassword = async (req, res, next) => {
  try {
    const { password, email } = req.body;
    const newPass = bcrypt.hashSync(password, 12);
    await User.findOneAndUpdate({ email: email }, { password: newPass });
    return res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
module.exports = changePassword;
