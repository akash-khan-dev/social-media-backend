const router = require("express").Router();
const registrationController = require("../../controllers/registrationController");
const loginController = require("../../controllers/loginController");
const verifiedUserController = require("../../controllers/verifiedUser");

//TODO: method change this get == post
router.post("/", registrationController);
router.post("/activate", verifiedUserController);
router.post("/login", loginController);

module.exports = router;
