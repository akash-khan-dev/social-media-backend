const router = require("express").Router();
const registrationController = require("../../controllers/registrationController");
const verifiedUserController = require("../../controllers/verifiedUser");

//TODO: method change this get == post
router.post("/", registrationController);
router.post("/activate", verifiedUserController);

module.exports = router;
