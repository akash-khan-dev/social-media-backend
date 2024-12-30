const router = require("express").Router();

const createCommentController = require("../../controllers/createCommentController");
const createPost = require("../../controllers/createPost");
const removePostController = require("../../controllers/removePostController");
const savePostController = require("../../controllers/savePostController");
const showPosts = require("../../controllers/showPost");

const verifyToken = require("../../Middleware/verifyToken");

router.post("/createPost", verifyToken, createPost);
router.get("/showPost", verifyToken, showPosts);
router.put("/comment", verifyToken, createCommentController);
router.put("/savepost/:id", verifyToken, savePostController);
router.delete("/removepost/:id", verifyToken, removePostController);

module.exports = router;
