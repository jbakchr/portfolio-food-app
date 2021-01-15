const Ingredient = require("../models/Ingredient");

const ingredients = require("../data/ingredients.json");

const dbSeeding = async () => {
  try {
    await Ingredient.bulkCreate(ingredients);
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbSeeding;
