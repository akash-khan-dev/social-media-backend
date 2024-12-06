const uploadImageMiddleware = require("../../Middleware/uploadImageMiddleware");
const {
  uploadImageController,
  imageList,
} = require("../../controllers/uploadImageController");
const router = require("express").Router();

router.post("/uploadImage", uploadImageMiddleware, uploadImageController);
router.get("/imgList", imageList);

module.exports = router;
