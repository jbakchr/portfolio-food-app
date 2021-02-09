import React from "react";

import SearchWordChip from "./SearchWordChip";

const SearchWordChipList = ({ searchWordSelections, chipDeleteHandler }) => {
  const renderSearchWordChips = () => {
    return searchWordSelections.map((el, index) => {
      return (
        <SearchWordChip
          key={el.search_word}
          label={el.search_word}
          chipDeleteHandler={() => chipDeleteHandler(index)}
        />
      );
    });
  };

  return <div style={{ marginTop: 5 }}>{renderSearchWordChips()}</div>;
};

export default SearchWordChipList;
