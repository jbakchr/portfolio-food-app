const db = require("../db/db");

const Ingredient = require("../models/Ingredient");
const Recipe = require("../models/Recipe");

const ingredients = require("../data/ingredients.json");
const recipes = require("../data/recipes.json");
const ingredients_recipes = require("../data/ingredients-recipes.json");

const dbSeeding = async () => {
  try {
    await Ingredient.bulkCreate(ingredients);
    await Recipe.bulkCreate(recipes);
    await db.models.ingredients_recipes.bulkCreate(ingredients_recipes);
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbSeeding;
