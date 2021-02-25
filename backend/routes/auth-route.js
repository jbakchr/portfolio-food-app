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

  res.status(201).json({ userId: createdUser.id, token });
});

router.post("/login", async (req, res, next) => {
  // Get email and password
  const { email, password } = req.body;

  // Check if user already exists
  let existingUser = await userExists(email, res);
  if (!existingUser) {
    // TODO: Change status code to correct one ..
    return res.status(500).json({ msg: "No user exists" });
  }

  // Check if password is valid
  if (await !checkPassword(password, existingUser.password, res)) {
    return res
      .status(403)
      .json({ message: "Invalid credentials, could not log you in." });
  }

  // Get token
  let token = await getToken(existingUser, res);

  res.json({ userId: existingUser.id, token });
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

const checkPassword = async (password, existingPassword, res) => {
  let isValidPassword;
  try {
    isValidPassword = await bcrypt.compare(password, existingPassword);
  } catch (error) {
    return res.status(500).json({
      message:
        "Could not log you in, please check your credentials and try again.",
    });
  }
  return isValidPassword;
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

const getToken = async (user, res) => {
  let token;
  try {
    token = await jwt.sign({ userId: user.id }, "super_duper_secret", {
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
