const express = require("express");
const { QueryTypes } = require("sequelize");

const db = require("../db/db");

const router = express.Router();

router.get("/", async (req, res, next) => {
  // Get query
  const query = req.query.q;

  // Create sql query
  const sql = `
    SELECT r.id, r.recipe, r.ingredients, r.recipe_text
    FROM recipes AS r
    INNER JOIN ingredients_recipes AS ir
      ON r.id = ir.recipeId
    INNER JOIN ingredients AS i
      ON ir.ingredientId = i.id
    WHERE i.ingredient IN ('${query.toString()}');
  `;

  // Execute sql
  try {
    const recipes = await db.query(sql, { type: QueryTypes.SELECT });
    console.log("recipes:", recipes);
    return res.json(recipes);
  } catch (error) {
    res.status(500).json({ msg: "Unable to fetch recipes" });
  }
});

module.exports = router;
