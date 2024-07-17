const ResetCode = require("../models/ResetCode");
const User = require("../models/userModel");
const matchOTP = async (req, res, next) => {
  try {
    const { otp, email } = req.body;
    const user = await User.findOne({ email: email });
    const sendOTPUser = await ResetCode.findOne({ userId: user._id });
    if (sendOTPUser.code !== otp) {
      return res.status(400).json({ message: `OTP doesn't match ` });
    }
    return res.status(200).json({ message: "OTP match successful" });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

module.exports = matchOTP;
