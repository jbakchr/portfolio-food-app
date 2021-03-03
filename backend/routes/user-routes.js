const express = require("express");

const router = express.Router();

router.get("/:id/my-recipes", (req, res, next) => {
  res.json({ msg: "Ya made it" });
});

module.exports = router;
