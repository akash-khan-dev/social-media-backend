const router = require("express").Router();
const registrationController = require("../../controllers/registrationController");
const loginController = require("../../controllers/loginController");
const verifiedUserController = require("../../controllers/verifiedUser");
const verifyToken = require("../../Middleware/verifyToken");
const againActivateController = require("../../controllers/againActivateController");
const resetPassword = require("../../controllers/resetPassword");
const resetCode = require("../../controllers/resetCode");
const matchOTP = require("../../controllers/matchOTP");
const changePassword = require("../../controllers/changePassword");

router.post("/", registrationController);
router.post("/activate", verifyToken, verifiedUserController);
router.post("/login", loginController);
router.post("/againActivate", verifyToken, againActivateController);
router.post("/resetPassword", resetPassword);
router.post("/resetCode", resetCode);
router.post("/matchOTP", matchOTP);
router.post("/changePassword", changePassword);

module.exports = router;
