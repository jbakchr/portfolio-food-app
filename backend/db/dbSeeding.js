const bcrypt = require("bcryptjs");

// DB
const db = require("../db/db");

// Models
const Ingredient = require("../models/Ingredient");
const FoodType = require("../models/FoodType");
const Recipe = require("../models/Recipe");
const User = require("../models/User");

// Data
const recipes = require("../data/recipes.json");

const ingredients = require("../data/ingredients.json");
const ingredients_recipes = require("../data/ingredients-recipes.json");

const foodtypes = require("../data/foodtypes.json");
const foodtypes_recipes = require("../data/foodtypes-recipes.json");

const users = require("../data/users.json");

const dbSeeding = async () => {
  try {
    // Ingredients - Recipes
    await Ingredient.bulkCreate(ingredients);
    await Recipe.bulkCreate(recipes);
    await db.models.ingredients_recipes.bulkCreate(ingredients_recipes);

    // FoodTypes - Recipes
    await FoodType.bulkCreate(foodtypes);
    await db.models.foodtypes_recipes.bulkCreate(foodtypes_recipes);

    // Users
    let hashedPassword = await bcrypt.hash(users[0].password, 12);
    await User.create({
      email: users[0].email,
      password: hashedPassword,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbSeeding;
