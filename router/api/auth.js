const router = require("express").Router();

//TODO: method change this get == post
router.get("/register", (req, res) => {
  res.send("hello world!");
});

module.exports = router;

