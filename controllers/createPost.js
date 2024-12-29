const Post = require("../models/Post");
const createPostController = async (req, res, next) => {
  try {
    const newPost = await new Post(req.body).save();
    newPost.populate("user", "profilePicture cover lastName lastName username");
    return res.status(200).json(newPost);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};
module.exports = createPostController;
