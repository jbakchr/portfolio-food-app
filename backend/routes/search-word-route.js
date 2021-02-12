const express = require("express");

const Ingredient = require("../models/Ingredient");
const FoodType = require("../models/FoodType");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    // Search words
    const searchWords = [];

    // Data
    const ingredients = await Ingredient.findAll({
      attributes: ["type", ["ingredient", "search_word"]],
    });
    const foodtypes = await FoodType.findAll({
      attributes: ["type", ["foodtype", "search_word"]],
    });

    searchWords.push(...ingredients, ...foodtypes);

    return res.json(searchWords);
  } catch (error) {
    res.status(500).json({ msg: "Unable to fetch search words" });
  }
});

module.exports = router;
