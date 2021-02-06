const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.json("You made it!");
});

module.exports = router;
