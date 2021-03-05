import React from "react";
import { TextField } from "@material-ui/core";

const SearchField = ({ onSearchTextChange, searchText, setSearchText }) => {
  return (
    <div
      style={{
        backgroundColor: "lightgray",
        borderRadius: "25px",
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
      }}
    >
      <TextField
        fullWidth
        autoFocus
        placeholder="Søg på ingredienser, måtid osv."
        type="search"
        InputProps={{ disableUnderline: true }}
        onChange={(event) => setSearchText(event.target.value)}
        value={searchText}
      />
    </div>
  );
};

export default SearchField;
