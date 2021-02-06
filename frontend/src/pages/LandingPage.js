import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "@material-ui/core";

import Navbar from "../components/Navbar";
import SearchField from "../components/SearchField";
import SearchWordChipList from "../components/SearchWordChipList";
import SearchWordList from "../components/SearchWordList";
import RecipeList from "../components/RecipeList";

const LandingPage = () => {
  const [searchWords, setSearchWords] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchWordSelections, setSearchWordSelections] = useState([]);

  useEffect(() => {
    fetchSearchWords();
  }, []);

  const fetchSearchWords = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/search-words"
      );
      setSearchWords(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onSearchTextChange = (text) => {
    setSearchText(text);
  };

  const searchWordClickHandler = async (index) => {
    // When a search word is clicked we first get a copy of the search words
    // from which we extract the clicked search word
    let searchWordsCopy = [...searchWords];
    const clickedSearchWord = searchWordsCopy.splice(index, 1);

    // Set state
    setSearchWords(searchWordsCopy);
    setSearchText("");
    setSearchWordSelections(searchWordSelections.concat(clickedSearchWord));
  };

  const conditionalListRendering = () => {
    return searchText ? (
      <SearchWordList
        searchText={searchText}
        searchWords={searchWords}
        searchWordClickHandler={searchWordClickHandler}
      />
    ) : (
      <RecipeList />
    );
  };

  return (
    <Container maxWidth="lg">
      <Navbar />
      <SearchField
        searchText={searchText}
        onSearchTextChange={onSearchTextChange}
      />
      <SearchWordChipList searchWordSelections={searchWordSelections} />
      {conditionalListRendering()}
    </Container>
  );
};

export default LandingPage;
