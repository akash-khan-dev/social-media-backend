const router = require("express").Router();
const authRoute = require("./auth");

// const api = process.env.API;

router.use("/auth", authRoute);
module.exports = router;
