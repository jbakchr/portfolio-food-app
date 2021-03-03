import React from "react";
import { CardHeader, CardActions, IconButton } from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const RecipeCardHeader = ({ title }) => {
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
          <FavoriteBorderIcon />
        </IconButton>
      </CardActions>
    </div>
  );
};

export default RecipeCardHeader;
