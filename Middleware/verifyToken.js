const jwt = require("jsonwebtoken");
const verifyToken = async (req, res, next) => {
  try {
    const receiveToken = req.header("Authorization");
    const token = receiveToken
      ? receiveToken.slice(7, receiveToken.length)
      : "";

    if (!token) {
      return res.status(404).json({ message: "you have not valid token" });
    }
    jwt.verify(token, process.env.SECRET_KEY, function (err, user) {
      if (err) {
        return res.status(404).json({ message: "Invalid token" });
      }
      req.user = user;
      next();
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
module.exports = verifyToken;
