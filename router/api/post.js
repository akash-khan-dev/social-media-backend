const router = require("express").Router();

const createPost = require("../../controllers/createPost");
const showPosts = require("../../controllers/showPost");
const verifiedUserController = require("../../controllers/verifiedUser");

router.post("/createPost", createPost);
router.get("/showPost", showPosts);

module.exports = router;
