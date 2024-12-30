const User = require("../models/userModel");
const PostModel = require("../models/Post");
const showPosts = async (req, res) => {
  try {
    const user = await User.findById(req.user.user).select("following friends");
    const following = user?.following || [];
    const friends = user?.friends || [];
    const combinedIds = [...new Set([...following, ...friends])];

    const postsPromises = combinedIds.map((userId) => {
      return PostModel.find({ user: userId })
        .populate(
          "user",
          "profilePicture cover firstName lastName username gender"
        )
        .populate(
          "comments.commentedBy",
          "profilePicture username firstName lastName"
        );
    });

    const userPosts = await PostModel.find({ user: req.user.user })
      .populate(
        "user",
        "profilePicture cover firstName lastName username gender"
      )
      .sort({ createdAt: -1 });

    const combinedPosts = (await Promise.all(postsPromises)).flat();
    const allPosts = [...combinedPosts, ...userPosts];
    return res.status(200).json({ data: allPosts });
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

module.exports = showPosts;
