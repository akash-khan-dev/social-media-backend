const uploadImageController = require("../../controllers/uploadImageController");

const router = require("express").Router();

router.post("/uploadImage", uploadImageController);

module.exports = router;
