const router = require("express").Router();
const registerController = require("../../controllers/registerController");

//TODO: method change this get == post
router.post("/register", registerController);

module.exports = router;
