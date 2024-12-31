const User = require("../models/userModel");
const addSearchHistoryController = async (req, res) => {
  try {
    const { searchUser } = req.body;

    const search = {
      user: searchUser,
      createdAt: new Date(),
    };
    const user = await User.findByIdAndUpdate(req.user.user);
    const check = user.search.find((x) => x.user.toString() === searchUser);
    if (check) {
      await User.updateOne(
        {
          _id: req.user.user,
          "search._id": check._id,
        },
        {
          $set: {
            "search.$.createdAt": new Date(),
          },
        }
      );
    } else {
      await User.findByIdAndUpdate(req.user.user, {
        $push: {
          search,
        },
      });
    }
  } catch (error) {
    return res.status(404).send({ message: error.message });
  }
};

module.exports = addSearchHistoryController;
