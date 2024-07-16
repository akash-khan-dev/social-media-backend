const { sendVerifiedEmail } = require("../helpers/mailer");
const { jwtToken } = require("../helpers/token");
const User = require("../models/userModel");
const againActivateController = async (req, res, next) => {
  try {
    const id = req.user.user;
    const user = await User.findById({ _id: id });
    if (user.verified) {
      return res.status(400).json({ message: "This account already activate" });
    }
    const emailToken = jwtToken(user._id, "30m");
    const url = `${process.env.BASE_URL}/activate/${emailToken}`;
    sendVerifiedEmail(user.email, user.firstName, url);
    return res.status(200).json({
      message: "Email verification link has been send to your email account",
    });
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

module.exports = againActivateController;
