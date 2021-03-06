import React, { useState } from "react";
import { CardHeader, CardActions, IconButton } from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import axiosInstance from "../../utils/axios-instance";

const RecipeCardHeader = ({ userId, recipeId, title, liked_by_user }) => {
  const [favorite, setFavorite] = useState(liked_by_user);

  const favoriteRecipe = async () => {
    // Send request to the back end
    try {
      const response = await axiosInstance.post(
        `/users/${userId}/recipes/${recipeId}/favorite`
      );
      if (response.status === 201) {
        setFavorite("1");
      }
    } catch (error) {
      console.log("Some freakin' error .. :", error);
    }
  };

  console.log("Favorite it is:", favorite);

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
        <IconButton
          onClick={() => {
            if (favorite === "1") {
              console.log("Unfavorite recipe");
            } else {
              favoriteRecipe();
            }
          }}
        >
          {favorite === "1" ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </CardActions>
    </div>
  );
};

export default RecipeCardHeader;
