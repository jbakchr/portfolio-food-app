import React from "react";
import { Chip } from "@material-ui/core";

const SearchWordChip = ({ label }) => {
  return (
    <Chip
      style={{ marginRight: 5 }}
      label={label}
      color="primary"
      onDelete={() => console.log("Delete me!")}
    />
  );
};

export default SearchWordChip;
