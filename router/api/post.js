const router = require("express").Router();

const createCommentController = require("../../controllers/createCommentController");
const createPost = require("../../controllers/createPost");
const showPosts = require("../../controllers/showPost");
const verifiedUserController = require("../../controllers/verifiedUser");

const verifyToken = require("../../Middleware/verifyToken");

router.post("/createPost", createPost);
router.get("/showPost", showPosts);
router.put("/comment", verifyToken, createCommentController);

module.exports = router;
