const router = require("express").Router();
const userController = require("../../controllers/userController");
const verifiedUserController = require("../../controllers/verifiedUser");

//TODO: method change this get == post
router.post("/", userController);
router.post("/activate", verifiedUserController);

module.exports = router;
