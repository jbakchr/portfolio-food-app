import React from "react";

import RecipeCard from "./RecipeCard/RecipeCard";

const RecipeList = ({ userId, searchText, recipes }) => {
  console.log(recipes);
  if (searchText) {
    return null;
  }

  const renderRecipeCards = () => {
    return recipes.map((recipe) => {
      return <RecipeCard key={recipe.recipe} userId={userId} recipe={recipe} />;
    });
  };

  return <div>{renderRecipeCards()}</div>;
};

export default RecipeList;
