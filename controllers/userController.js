const User = require("../models/userModel");

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
    }).save();
    return res.status(200).json({ user: newUser });
  } catch (err) {
    res.status(404).send(err.message);
  }
};
module.exports = userController;
