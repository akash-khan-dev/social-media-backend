const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const verifiedUser = async (req, res, next) => {
  try {
    const { token } = req.body;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const checkVerified = await User.findById(decoded.user);
    if (checkVerified.verified === "true") {
      return res
        .status(400)
        .json({ message: "This email is already verified" });
    }
    await User.findByIdAndUpdate(decoded.user, { $set: { verified: true } });
    return res.status(200).json({ message: "verified successful" });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};
module.exports = verifiedUser;
