const router = require("express").Router();
const apiRoute = require("./api");

const api = process.env.API;

router.use(api, apiRoute);
module.exports = router;
