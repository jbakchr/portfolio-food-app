import React from "react";
import { List } from "@material-ui/core";

import SearchWordListItem from "./SearchWordListItem";

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
            <SearchWordListItem
              key={el.ingredient}
              searchWordText={el.ingredient}
              searchWordClickHandler={() => searchWordClickHandler(index)}
            />
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
