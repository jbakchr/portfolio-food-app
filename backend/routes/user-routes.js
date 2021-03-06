const express = require("express");
const { QueryTypes } = require("sequelize");

const db = require("../db/db");
const Recipe = require("../models/Recipe");

const router = express.Router();

router.get("/:id/my-recipes", (req, res, next) => {
  res.json({ msg: "Ya made it" });
});

router.post("/:userId/recipes/:recipeId/favorite", async (req, res, next) => {
  // Get userId and recipeId
  const { userId, recipeId } = req.params;

  // Check if recipe exists
  let recipe;
  try {
    recipe = await Recipe.findAll({
      where: {
        id: recipeId,
      },
    });
  } catch (error) {
    console.log(error);
    // TODO: Change to correct status code
    return res.status(500).json({ msg: "error looking up recipe .." });
  }

  console.log("recipe is:", recipe);

  if (!recipe) {
    // TODO: Change this too ..
    return res.status(400).json({ msg: "No recipe found .." });
  }

  // TODO: You should check that relation between user and recipe doesn't already exist here ..

  // Insert new relation
  const sql = `
    INSERT INTO users_recipes (userId, recipeId)
    VALUES (${userId}, ${recipeId});
  `;

  let insertion;
  try {
    insertion = await db.query(sql, { type: QueryTypes.INSERT });
  } catch (error) {
    return res.status(500).json({ msg: "Could not insert relation" });
  }

  res.status(201).json({ msg: "New favorite recipe added" });
});

module.exports = router;
