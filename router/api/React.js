const router = require("express").Router();

const getAllReactController = require("../../controllers/getAllReactController");
const reactPost = require("../../controllers/reactPost");
const verifyToken = require("../../Middleware/verifyToken");

router.put("/reactpost", verifyToken, reactPost);
router.get("/getAllReact/:id", verifyToken, getAllReactController);

module.exports = router;
