const User = require("../models/userModel");
const savePostController = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const user = await User.findById(req.user.user);
    const check = user?.savePost.find((a) => a.post.toString() === postId);

    if (check) {
      await User.findByIdAndUpdate(req.user.user, {
        $pull: {
          savePost: {
            _id: check._id,
          },
        },
      });
    } else {
      await User.findByIdAndUpdate(req.user.user, {
        $push: {
          savePost: {
            post: postId,
            saveAt: new Date(),
          },
        },
      });
    }
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};
module.exports = savePostController;
