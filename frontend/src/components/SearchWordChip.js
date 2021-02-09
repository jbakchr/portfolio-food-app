import React from "react";
import { Chip } from "@material-ui/core";

const SearchWordChip = ({ label, chipDeleteHandler }) => {
  return (
    <Chip
      style={{ marginRight: 5 }}
      label={label}
      color="primary"
      onDelete={chipDeleteHandler}
    />
  );
};

export default SearchWordChip;
