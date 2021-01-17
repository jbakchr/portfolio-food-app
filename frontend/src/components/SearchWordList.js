import React from "react";
import { List, ListItem } from "@material-ui/core";

const SearchWordList = ({ searchText, searchWords }) => {
  const renderListItems = () => {
    if (searchText) {
      return searchWords.map((el) => {
        if (el.ingredient.startsWith(searchText)) {
          return <ListItem key={el.ingredient}>{el.ingredient}</ListItem>;
        }
        return null;
      });
    }
    return null;
  };

  return <List>{renderListItems()}</List>;
};

export default SearchWordList;
