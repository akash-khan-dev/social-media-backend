const registerController = async (req, res, next) => {
  try {
    console.log(req.body);
  } catch (err) {
    res.status(404).send(err.message);
  }
};
module.exports = registerController;
