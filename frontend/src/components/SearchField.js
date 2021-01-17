import React from "react";
import { TextField } from "@material-ui/core";

const SearchField = ({ onSearchTextChange, searchText }) => {
  return (
    <TextField
      variant="filled"
      fullWidth
      onChange={(e) => onSearchTextChange(e.target.value)}
      value={searchText}
    />
  );
};

export default SearchField;
