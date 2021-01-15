const express = require("express");

const Ingredient = require("../models/Ingredient");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const searchWords = await Ingredient.findAll({});
    return res.json(searchWords);
  } catch (error) {
    res.status(500).json({ msg: "Unable to fetch search words" });
  }
});

module.exports = router;