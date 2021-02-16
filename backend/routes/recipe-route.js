const express = require("express");
const { QueryTypes, where } = require("sequelize");

const db = require("../db/db");

const router = express.Router();

router.get("/", async (req, res, next) => {
  // Extract query
  const query = JSON.parse(req.query.q);

  // Initialize arrays for possible query building
  let ingredientSearchWords = [];
  let foodtypeSearchWords = [];

  // Extract search words for WHERE clause in sql
  query.forEach((el) => {
    switch (el.type) {
      case "ingredient":
        ingredientSearchWords.push(`'${el.search_word}'`);
        break;
      case "foodtype":
        foodtypeSearchWords.push(`'${el.search_word}'`);
        break;
    }
  });

  // Determine INNER JOIN clauses
  let ingredientInnerJoin = getInnerJoin("ingredient", ingredientSearchWords);
  let foodtypeInnerJoin = getInnerJoin("foodtype", foodtypeSearchWords);

  // Determine WHERE clause
  let whereClause = getWhereClause(ingredientSearchWords, foodtypeSearchWords);

  // Determine HAVING clause amount
  const havingClause = getHavingClause(
    ingredientSearchWords,
    foodtypeSearchWords
  );

  // Create SQL
  let sql = `
    SELECT r.*
    FROM recipes AS r
    ${ingredientInnerJoin}
    ${foodtypeInnerJoin}
    ${whereClause}
    GROUP BY 1
    ${havingClause}
    ORDER BY 1
  `;

  // Execute sql
  try {
    const recipes = await db.query(sql, { type: QueryTypes.SELECT });
    return res.json(recipes);
  } catch (error) {
    res.status(500).json({ msg: "Unable to fetch recipes" });
  }
});

const getInnerJoin = (type, arr) => {
  if (type === "ingredient" && arr.length > 0) {
    return `INNER JOIN ingredients_recipes AS ir
      ON r.id = ir.recipeId
    INNER JOIN ingredients AS i
      ON ir.ingredientId = i.id`;
  }

  if (type === "foodtype" && arr.length > 0) {
    return `INNER JOIN foodtypes_recipes AS fr
      ON r.id = fr.recipeId
    INNER JOIN foodtypes AS f
      ON fr.foodtypeId = f.id
    `;
  }

  return ``;
};

const getWhereClause = (ingredientArr, foodtypeArr) => {
  let whereClause = `WHERE `;

  if (ingredientArr.length > 0) {
    whereClause += `i.ingredient IN (${ingredientArr.toString()})`;
  }

  if (ingredientArr.length > 0 && foodtypeArr.length > 0) {
    whereClause += " AND ";
  }

  if (foodtypeArr.length > 0) {
    whereClause += `f.foodtype IN (${foodtypeArr.toString()})`;
  }

  return whereClause;
};

const getHavingClause = (ingredientArr, foodtypeArr) => {
  return `HAVING COUNT(r.id) = ${
    ingredientArr.length > foodtypeArr.length
      ? ingredientArr.length
      : foodtypeArr.length
  }`;
};

module.exports = router;
