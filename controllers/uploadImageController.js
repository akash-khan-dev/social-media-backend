
const uploadImageController = async (req, res) => {
  try {
    res.send("uploading image");
  } catch (e) {
    return res.status(404).json({ message: e.message });
  }
};
module.exports = uploadImageController;
