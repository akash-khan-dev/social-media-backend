const router = require("express").Router();
const authRoute = require("./auth");
const postRoute = require("./post");
// const api = process.env.API;

router.use("/auth", authRoute);
router.use("/post", postRoute);
module.exports = router;
