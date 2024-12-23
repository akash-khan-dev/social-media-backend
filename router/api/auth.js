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
const getUserController = require("../../controllers/getUserController");
const uploadProfilePictureController = require("../../controllers/uploadProfilePictureControlle");
const uploadCoverPictureController = require("../../controllers/uploadCoverPictureController");
const updateDetailsController = require("../../controllers/updateDetailsController");
const addFriendController = require("../../controllers/addFriendController");
const cancelRequestController = require("../../controllers/cancelRequestController");
const followController = require("../../controllers/followController");
const unFollowController = require("../../controllers/unFollowController");
const acceptRequestController = require("../../controllers/acceptRequestController");
const unFriendController = require("../../controllers/unFriendController");
const deleteRequestController = require("../../controllers/deleteRequestController");

router.post("/", registrationController);
router.post("/activate", verifyToken, verifiedUserController);
router.post("/login", loginController);
router.post("/againActivate", verifyToken, againActivateController);
router.post("/resetPassword", resetPassword);
router.post("/resetCode", resetCode);
router.post("/matchOTP", matchOTP);
router.post("/changePassword", changePassword);
router.get("/user/:username", verifyToken, getUserController);
router.put(
  "/uploadProfilePicture",
  verifyToken,
  uploadProfilePictureController
);
router.put("/uploadCoverPicture", verifyToken, uploadCoverPictureController);
router.put("/uploadDetails", verifyToken, updateDetailsController);
router.put("/addfriend/:id", verifyToken, addFriendController);
router.put("/cancelrequest/:id", verifyToken, cancelRequestController);
router.put("/follow/:id", verifyToken, followController);
router.put("/unfollow/:id", verifyToken, unFollowController);
router.put("/acceptrequest/:id", verifyToken, acceptRequestController);
router.put("/unfrined/:id", verifyToken, unFriendController);
router.put("/deleterequest/:id", verifyToken, deleteRequestController);

module.exports = router;
