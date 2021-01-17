import React from "react";
import { List, ListItem } from "@material-ui/core";

const SearchWordList = ({
  searchText,
  searchWords,
  searchWordClickHandler,
}) => {
  const renderListItems = () => {
    if (searchText) {
      return searchWords.map((el, index) => {
        if (el.ingredient.startsWith(searchText)) {
          return (
            <div
              key={el.ingredient}
              onClick={() => searchWordClickHandler(index)}
            >
              <ListItem button>{el.ingredient}</ListItem>
            </div>
          );
        }
        return null;
      });
    }
    return null;
  };

  return <List>{renderListItems()}</List>;
};

export default SearchWordList;
