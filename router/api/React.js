const router = require("express").Router();

const reactPost = require("../../controllers/reactPost");
const verifyToken = require("../../Middleware/verifyToken");

router.put("/reactpost", verifyToken, reactPost);

module.exports = router;
