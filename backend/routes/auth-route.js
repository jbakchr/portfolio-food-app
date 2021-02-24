const express = require("express");

const router = express.Router();

router.post("/signup", (req, res, next) => {
  res.send("Made it");
});

module.exports = router;
