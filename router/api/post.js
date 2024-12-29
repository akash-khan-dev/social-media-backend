const router = require("express").Router();

const createCommentController = require("../../controllers/createCommentController");
const createPost = require("../../controllers/createPost");
const showPosts = require("../../controllers/showPost");

const verifyToken = require("../../Middleware/verifyToken");

router.post("/createPost", verifyToken, createPost);
router.get("/showPost", verifyToken, showPosts);
router.put("/comment", verifyToken, createCommentController);

module.exports = router;
