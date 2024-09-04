const router = require("express").Router();

const postController = require("../../controllers/postController");
const verifiedUserController = require("../../controllers/verifiedUser");

router.post("/createPost", postController);

module.exports = router;
