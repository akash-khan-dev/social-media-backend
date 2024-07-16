const { jwtToken } = require("../helpers/token");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "The email address you entered is not connected to an account",
      });
    }
    bcrypt.compare(password, user.password).then(function (result) {
      if (!result) {
        return res.status(400).json({ message: "Incorrect your password" });
      }
      const token = jwtToken(user._id, "7d");
      res.status(200).json({
        id: user._id,
        username: user.username,
        profilePicture: user.profilePicture,
        firstName: user.firstName,
        lastName: user.lastName,
        email: email,
        token: token,
        verified: user.verified,
        message: "Login successful ",
      });
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
module.exports = loginController;
