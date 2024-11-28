const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const {
  validateEmail,
  validateLength,
  validateUsername,
} = require("../helpers/validation");
const { jwtToken } = require("../helpers/token");
const { sendVerifiedEmail } = require("../helpers/mailer");

const registrationController = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      cover,
      bMonth,
      bDay,
      bYear,
      friends,
      followers,
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
    if (!validateLength(firstName, 3, 15)) {
      return res.status(400).json({
        Message: "firstName Should be minimum 3 and max 15 characters",
      });
    }
    if (!validateLength(lastName, 3, 15)) {
      return res.status(400).json({
        Message: "lastName Should be minimum 2 and max 15 characters",
      });
    }
    // password validation
    if (!validateLength(password, 8, 40)) {
      return res.status(400).json({
        Message: "password Should be minimum 8",
      });
    }

    // username validate
    let tempUsername = firstName + lastName;
    let finalUsername = await validateUsername(tempUsername);
    // password has
    const hash = bcrypt.hashSync(password, 12);
    const newUser = await new User({
      firstName,
      lastName,
      username: finalUsername,
      email,
      password: hash,
      cover,
      friends,
      followers,
      bMonth,
      bDay,
      bYear,
      verified,
      gender,
    });
    newUser.save();

    // token generation
    const emailToken = jwtToken(newUser._id, "30m");

    // send verification email
    const url = `${process.env.BASE_URL}/activate/${emailToken}`;
    sendVerifiedEmail(newUser.email, newUser.firstName, url);

    const token = jwtToken(newUser._id, "7d");
    return res.status(200).json({
      id: newUser._id,
      username: newUser.username,
      profilePicture: newUser.profilePicture,
      firstName: newUser.firstName,
      cover: newUser.cover,
      friends: newUser.friends,
      followers: newUser.followers,
      lastName: newUser.lastName,
      token: token,
      verified: newUser.verified,
      message: "Registration successful! Please activate your email to start",
    });
  } catch (err) {
    res.status(404).send(err.message);
  }
};
module.exports = registrationController;
