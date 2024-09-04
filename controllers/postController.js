const Post = require("../models/Post");
const postController = async (req, res, next) => {
  try {
    const newPost = await new Post(req.body);
    newPost.save();
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};
module.exports = postController;
