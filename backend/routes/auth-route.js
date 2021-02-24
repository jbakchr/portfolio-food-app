const express = require("express");

const router = express.Router();

router.post("/signup", (req, res, next) => {
  res.json({ body: req.body });
});

module.exports = router;
