const { DataTypes } = require("sequelize");

const db = require("../db/db");

const Recipe = db.define("recipe", {
  recipe: DataTypes.STRING,
  ingredients: DataTypes.TEXT,
  recipe_text: DataTypes.TEXT,
});

module.exports = Recipe;
