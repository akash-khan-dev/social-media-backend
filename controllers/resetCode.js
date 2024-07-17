const { sendResetCodeEmail } = require("../helpers/mailer");
const ResetCode = require("../models/ResetCode");
const User = require("../models/userModel");
const aleaRNGFactory = require("number-generator/lib/aleaRNGFactory");
const resetCode = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email }).select("-password");

    await ResetCode.findOneAndDelete({ userId: user._id });
    const generator = aleaRNGFactory(Date.now());
    const OTP = generator.uInt32().toString().substring(0, 5);
    const saveCode = await ResetCode({
      userId: user._id,
      code: OTP,
    });
    saveCode.save();
    sendResetCodeEmail(email, user.sendResetCodeEmail, OTP);
    return res
      .status(200)
      .json({ message: "Reset Code has been send your email" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
module.exports = resetCode;
