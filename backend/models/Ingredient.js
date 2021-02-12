const { DataTypes } = require("sequelize");

const db = require("../db/db");
const Recipe = require("../models/Recipe");

const Ingredient = db.define(
  "ingredient",
  {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "ingredient",
    },
    ingredient: DataTypes.STRING,
  },
  {
    timestamps: false,
  }
);

Ingredient.belongsToMany(Recipe, {
  through: "ingredients_recipes",
  timestamps: false,
});

module.exports = Ingredient;
