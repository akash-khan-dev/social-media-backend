const express = require("express");
require("dotenv").config();
const cors = require("cors");
const router = require("./router/index");
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// router
app.use("/", router);
const PORT = process.env.PORT || 3000;
app.listen(PORT, (req, res) => {
  console.log(`listening on port ${PORT}`);
});
