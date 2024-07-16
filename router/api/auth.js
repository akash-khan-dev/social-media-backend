const router = require("express").Router();
const registrationController = require("../../controllers/registrationController");
const loginController = require("../../controllers/loginController");
const verifiedUserController = require("../../controllers/verifiedUser");

router.post("/", registrationController);
router.post("/activate", verifiedUserController);
router.post("/login", loginController);

module.exports = router;
