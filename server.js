const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("hello world!");
});

app.listen("4000", (req, res) => {
  console.log("listening on port 4000");
});
