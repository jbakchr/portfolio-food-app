const { DataTypes } = require("sequelize");

const db = require("../db/db");
const Recipe = require("../models/Recipe");

const FoodType = db.define(
  "foodtype",
  {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "foodtype",
    },
    foodtype: DataTypes.STRING,
  },
  {
    timestamps: false,
  }
);

FoodType.belongsToMany(Recipe, {
  through: "foodtypes_recipes",
  timestamps: false,
});

module.exports = FoodType;
