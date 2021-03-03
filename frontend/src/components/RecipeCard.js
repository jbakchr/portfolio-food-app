import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Typography,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";

const RecipeCard = ({ recipe }) => {
  return (
    <Card style={{ margin: 20, border: "2px solid lightgrey" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginRight: "15px",
        }}
      >
        <CardHeader title={recipe.recipe} />
        <CardActions>
          <IconButton>
            <FavoriteIcon />
          </IconButton>
        </CardActions>
      </div>
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
