import React from "react";
import { ListItem } from "@material-ui/core";

const SearchWordListItem = ({ searchWordText, searchWordClickHandler }) => {
  return (
    <ListItem onClick={searchWordClickHandler} button>
      {searchWordText}
    </ListItem>
  );
};

export default SearchWordListItem;
