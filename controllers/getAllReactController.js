const Reacts = require("../models/Reacts");
const User = require("../models/userModel");
const getAllReactController = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.user;
    const react = await Reacts.find({ postId: id });
    const check = await Reacts.findOne({
      postId: id,
      reactBy: userId,
    });
    let newReact = react.reduce((group, react) => {
      let key = react["react"];
      group[key] = group[key] || [];
      group[key].push(react);

      return group;
    }, {});

    const allReacts = [
      {
        react: "love",
        count: newReact.love ? newReact.love.length : 0,
      },
      {
        react: "haha",
        count: newReact.haha ? newReact.haha.length : 0,
      },
      {
        react: "like",
        count: newReact.like ? newReact.like.length : 0,
      },
      {
        react: "angry",
        count: newReact.angry ? newReact.angry.length : 0,
      },
      {
        react: "sad",
        count: newReact.sad ? newReact.sad.length : 0,
      },
      {
        react: "wow",
        count: newReact.wow ? newReact.wow.length : 0,
      },
    ];
    //   check if post id already ot not
    const user = await User.findById(req.user.user);

    const isPostSave = user?.savePost.find((x) => x.post.toString() === id);
    return res.json({
      allReacts,
      check: check?.react,
      total: react.length,
      isPostSave: isPostSave ? true : false,
    });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
module.exports = getAllReactController;
