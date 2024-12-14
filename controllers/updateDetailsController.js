const userModel = require("../models/userModel");
const updateDetailsController = async (req, res, next) => {
  try {
    const { infos, id } = req.body;
    const user = await userModel.findByIdAndUpdate(
      { _id: id },
      { details: infos },
      { new: true }
    );
    return res.send(user.details);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
module.exports = updateDetailsController;
