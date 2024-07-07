const User = require("../models/userModel");
const { validateEmail, validateUsername } = require("../helpers/validation");
const userController = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      bMonth,
      bDay,
      bYear,
      verified,
      gender,
    } = req.body;

    // email validation
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }
    // if email include
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ Message: "Email already in use" });
    }
    // name validation
    if (!validateUsername(firstName, 3, 15)) {
      return res.status(400).json({
        Message: "firstName Should be minimum 3 and max 15 characters",
      });
    }
    if (!validateUsername(lastName, 3, 15)) {
      return res.status(400).json({
        Message: "lastName Should be minimum 2 and max 15 characters",
      });
    }
    const newUser = await new User({
      firstName,
      lastName,
      username,
      email,
      password,
      bMonth,
      bDay,
      bYear,
      verified,
      gender,
    });
    newUser.save();
    return res.status(200).json({ user: newUser });
  } catch (err) {
    res.status(404).send(err.message);
  }
};
module.exports = userController;
