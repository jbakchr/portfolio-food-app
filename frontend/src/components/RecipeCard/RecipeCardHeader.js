import React, { useState } from "react";
import { CardHeader, CardActions, IconButton } from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import axiosInstance from "../../utils/axios-instance";

const RecipeCardHeader = ({ userId, recipeId, title, liked_by_user }) => {
  const [favorite, setFavorite] = useState(liked_by_user);

  const favoriteRecipe = async () => {
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

  const unfavoriteRecipe = async () => {
    try {
      const response = await axiosInstance.delete(
        `/users/${userId}/recipes/${recipeId}/unfavorite`
      );
      if (response.status === 200) {
        setFavorite("0");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
              unfavoriteRecipe();
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
