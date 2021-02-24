const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();

router.post("/signup", async (req, res, next) => {
  // Get email and password
  const { email, password } = req.body;

  // Check if user already exists
  if (await userExists(email, res)) {
    return res.status(422).json({ message: "User already exists" });
  }

  // Hash password
  const hashedPassword = await hashPassword(password, res);

  // Create user
  const createdUser = await createUser(email, hashedPassword, res);

  // Get token
  const token = await getToken(createdUser, res);

  res.json({ userId: createdUser.id, token });
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

  return existingUser;
};

const hashPassword = async (password, res) => {
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Could not create user, please try again." });
  }
  return hashedPassword;
};

const createUser = async (email, hashedPassword, res) => {
  let createdUser;
  try {
    createdUser = await User.create({
      email: email,
      password: hashedPassword,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Signing up failed, please try again later." });
  }

  return createdUser;
};

const getToken = async (createdUser, res) => {
  let token;
  try {
    token = await jwt.sign({ userId: createdUser.id }, "super_duper_secret", {
      expiresIn: "1h",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Signing up failed, please try again later." });
  }
  return token;
};

module.exports = router;
