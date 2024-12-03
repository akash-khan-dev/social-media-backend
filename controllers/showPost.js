const PostModel = require("../models/Post");
const showPosts = async (req, res) => {
  try {
    const posts = await PostModel.find()
      .populate("user", "firstName lastName username profilePicture")
      .sort({ createdAt: -1 });
    return res.status(200).json({ data: posts });
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

module.exports = showPosts;
