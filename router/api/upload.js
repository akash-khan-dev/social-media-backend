const router = require("express").Router();
const uploadImageMiddleware = require("../../Middleware/uploadImageMiddleware");
const {
  uploadImageController,
  imageList,
} = require("../../controllers/uploadImageController");

const verifyToken = require("../../Middleware/verifyToken");
// TODO: verify token check korte hobe
router.post("/uploadImage", uploadImageMiddleware, uploadImageController);
router.post("/imgList", imageList);

module.exports = router;
