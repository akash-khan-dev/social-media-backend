const router = require("express").Router();
const authRoute = require("./auth");
const postRoute = require("./post");
const uploadRoute = require("./upload");
// const api = process.env.API;

router.use("/auth", authRoute);
router.use("/post", postRoute);
router.use("/upload", uploadRoute);
module.exports = router;
