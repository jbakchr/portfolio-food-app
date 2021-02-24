const express = require("express");

const User = require("../models/User");

const router = express.Router();

router.post("/signup", async (req, res, next) => {
  // Get email and password
  const { email, password } = req.body;

  if (userExists(email, password)) res.json({ email, password });
});

const userExists = (email, password) => {
  return null;
};

module.exports = router;
