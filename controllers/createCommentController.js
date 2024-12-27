const Post = require("../models/Post");
const createCommentController = async (req, res) => {
  try {
    const userId = req.user.user;
    const { comment, image, postId } = req.body;
    const newComment = await Post.findByIdAndUpdate(
      postId,
      {
        $push: {
          comments: {
            text: comment,
            image: image,
            commentedBy: userId,
            commentedAt: new Date(),
          },
        },
      },
      { new: true }
    ).populate(
      "comments.commentedBy",
      "profilePicture username firstName lastName"
    );
    return res.json(newComment.comments);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
module.exports = createCommentController;
