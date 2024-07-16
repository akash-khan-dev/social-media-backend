const router = require("express").Router();
const registrationController = require("../../controllers/registrationController");
const loginController = require("../../controllers/loginController");
const verifiedUserController = require("../../controllers/verifiedUser");
const verifyToken = require("../../Middleware/verifyToken");

router.post("/", registrationController);
router.post("/activate", verifyToken, verifiedUserController);
router.post("/login", loginController);

module.exports = router;
