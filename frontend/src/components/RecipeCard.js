import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@material-ui/core";

const RecipeCard = ({ recipe }) => {
  return (
    <Card style={{ margin: 20, border: "2px solid lightgrey" }}>
      <CardHeader title={recipe.recipe} />
      <Divider />
      <CardContent>
        <Typography>Ingredienser:</Typography>
        <Typography color="textSecondary">{recipe.ingredients}</Typography>
        <Typography style={{ marginTop: 15 }}>Opskrift:</Typography>
        <Typography color="textPrimary">{recipe.recipe_text}</Typography>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
