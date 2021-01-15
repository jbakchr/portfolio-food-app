const { DataTypes } = require("sequelize");

const db = require("../db/db");

const Ingredient = db.define(
  "ingredient",
  {
    ingredient: DataTypes.STRING,
  },
  {
    timestamps: false,
  }
);
