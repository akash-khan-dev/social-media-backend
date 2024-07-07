const router = require("express").Router();
const userController = require("../../controllers/userController");

//TODO: method change this get == post
router.post("/", userController);

module.exports = router;
