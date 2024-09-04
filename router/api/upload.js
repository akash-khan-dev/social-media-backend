const uploadImageController = require("../../controllers/uploadImageController");
const uploadImageMiddleware = require("../../Middleware/uploadImageMiddleware");

const router = require("express").Router();

router.post("/uploadImage", uploadImageMiddleware, uploadImageController);

module.exports = router;
