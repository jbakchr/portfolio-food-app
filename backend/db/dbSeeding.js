const Ingredient = require("../models/Ingredient");
const Recipe = require("../models/Recipe");

const ingredients = require("../data/ingredients.json");
const recipes = require("../data/recipes.json");

const dbSeeding = async () => {
  try {
    await Ingredient.bulkCreate(ingredients);
    await Recipe.bulkCreate(recipes);
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbSeeding;
