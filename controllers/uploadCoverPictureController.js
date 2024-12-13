const userModel = require("../models/userModel");
const uploadCoverPictureController = async (req, res, next) => {
  try {
    const { url, id } = req.body;
    const user = await userModel.findByIdAndUpdate({ _id: id }, { cover: url });
    return res.json(url);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
module.exports = uploadCoverPictureController;
