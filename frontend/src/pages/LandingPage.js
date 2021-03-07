import React from "react";
import { Container } from "@material-ui/core";

import SearchField from "../components/SearchField";
import SearchWordChipList from "../components/SearchWordChipList";
import SearchWordList from "../components/SearchWordList";
import RecipeList from "../components/RecipeList";

const LandingPage = ({
  userId,
  searchWords,
  searchText,
  setSearchText,
  recipes,
  searchWordSelections,
  chipDeleteHandler,
  searchWordClickHandler,
}) => {
  return (
    <Container maxWidth="lg">
      <SearchField searchText={searchText} setSearchText={setSearchText} />
      <SearchWordChipList
        searchWordSelections={searchWordSelections}
        chipDeleteHandler={chipDeleteHandler}
      />
      <SearchWordList
        searchText={searchText}
        searchWords={searchWords}
        searchWordClickHandler={searchWordClickHandler}
      />
      <RecipeList userId={userId} searchText={searchText} recipes={recipes} />
    </Container>
  );
};

export default LandingPage;
