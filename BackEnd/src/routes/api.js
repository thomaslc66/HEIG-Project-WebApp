// routes/api.js

var express = require("express");
var router = express.Router();

router.get("/test", (req, res) => {
  res.json("Hello");
});

module.exports = router;
