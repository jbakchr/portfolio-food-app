import React from "react";

import RecipeCard from "./RecipeCard";

const RecipeList = ({ searchText, recipes }) => {
  if (searchText) {
    return null;
  }

  const renderRecipeCards = () => {
    return recipes.map((recipe) => {
      return <RecipeCard key={recipe.recipe} recipe={recipe} />;
    });
  };

  return <div>{renderRecipeCards()}</div>;
};

export default RecipeList;
