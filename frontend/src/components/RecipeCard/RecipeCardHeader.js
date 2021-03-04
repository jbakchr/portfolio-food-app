import React from "react";
import { CardHeader, CardActions, IconButton } from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

const RecipeCardHeader = ({ userId, title, liked_by_user }) => {
  console.log("liked_by_user:", typeof liked_by_user);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginRight: "15px",
      }}
    >
      <CardHeader title={title} />
      <CardActions>
        <IconButton>
          {parseInt(liked_by_user) === 1 ? (
            <FavoriteIcon />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>
      </CardActions>
    </div>
  );
};

export default RecipeCardHeader;
