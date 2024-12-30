const PostModel = require("../models/Post");
const removePostController = async (req, res, next) => {
  try {
    const postId = req.params.id;
    await PostModel.findByIdAndDelete({ _id: postId });
    return res.json({ message: "done" });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};
module.exports = removePostController;
