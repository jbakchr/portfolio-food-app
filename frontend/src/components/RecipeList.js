import React from "react";

import RecipeCard from "./RecipeCard";

const RecipeList = ({ recipes }) => {
  console.log("recipes", recipes);

  const renderRecipeCards = () => {
    return recipes.map((recipe) => {
      console.log(recipe);
      return <RecipeCard key={recipe.recipe} recipe={recipe} />;
    });
  };

  return <div>{renderRecipeCards()}</div>;
};

export default RecipeList;
