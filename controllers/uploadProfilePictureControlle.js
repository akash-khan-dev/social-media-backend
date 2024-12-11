const userModel = require("../models/userModel");
const uploadProfilePictureController = async (req, res, next) => {
  try {
    const { url, id } = req.body;
    const user = await userModel.findByIdAndUpdate(
      { _id: id },
      { profilePicture: url }
    );
    return res.json(url);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
module.exports = uploadProfilePictureController;
