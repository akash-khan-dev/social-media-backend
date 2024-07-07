const User = require("../models/userModel");
exports.validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
};

exports.validateUsername = (text, min, max) => {
  if (text.length < min || text.length > max) {
    return false;
  } else return true;
};
