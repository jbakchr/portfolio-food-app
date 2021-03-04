const { DataTypes } = require("sequelize");

const db = require("../db/db");
const Recipe = require("./Recipe.js");

const User = db.define(
  "user",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

User.belongsToMany(Recipe, { through: "users_recipes", timestamps: false });

module.exports = User;
