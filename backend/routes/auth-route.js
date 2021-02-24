const express = require("express");

const User = require("../models/User");

const router = express.Router();

router.post("/signup", async (req, res, next) => {
  // Get email and password
  const { email, password } = req.body;

  let existingUser = await userExists(email, res);
  console.log("in signup:", existingUser);

  res.json({ email, password });
});

const userExists = async (email, res) => {
  let existingUser;
  try {
    existingUser = await User.findOne({
      where: {
        email: email,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Logging in failed, please try again later.'" });
  }

  console.log("in userExists:", existingUser);

  return existingUser;
};

module.exports = router;
