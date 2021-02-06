import React from "react";

import SearchWordChip from "./SearchWordChip";

const SearchWordChipList = ({ searchWordSelections }) => {
  const renderSearchWordChips = () => {
    return searchWordSelections.map((el) => {
      return <SearchWordChip key={el.ingredient} label={el.ingredient} />;
    });
  };

  return <div>{renderSearchWordChips()}</div>;
};

export default SearchWordChipList;
