import React from "react";
import { List, ListItem } from "@material-ui/core";

const SearchWordList = ({ searchWords }) => {
  const renderListItems = () => {
    return searchWords.map((el) => {
      return <ListItem key={el.ingredient}>{el.ingredient}</ListItem>;
    });
  };

  return <List>{renderListItems()}</List>;
};

export default SearchWordList;
