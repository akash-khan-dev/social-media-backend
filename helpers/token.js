const jwt = require("jsonwebtoken");

exports.jwtToken = (user, expires) => {
  const token = jwt.sign({ user }, process.env.SECRET_KEY, {
    expiresIn: expires,
  });
  return token;
};
