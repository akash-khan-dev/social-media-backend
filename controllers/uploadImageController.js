const uploadImageController = async (req, res) => {
  try {
    res.send("Uploading");
  } catch (e) {
    return res.status(404).json({ message: e.message });
  }
};
module.exports = uploadImageController;
