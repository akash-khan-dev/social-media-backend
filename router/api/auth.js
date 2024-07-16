const router = require("express").Router();
const registrationController = require("../../controllers/registrationController");
const loginController = require("../../controllers/loginController");
const verifiedUserController = require("../../controllers/verifiedUser");
const verifyToken = require("../../Middleware/verifyToken");
const againActivateController = require("../../controllers/againActivateController");

router.post("/", registrationController);
router.post("/activate", verifyToken, verifiedUserController);
router.post("/login", loginController);
router.post("/againActivate", verifyToken, againActivateController);

module.exports = router;
