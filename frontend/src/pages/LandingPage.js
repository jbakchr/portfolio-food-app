import React, { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import axios from "axios";

import Navbar from "../components/Navbar";
import SearchField from "../components/SearchField";
import SearchWordChipList from "../components/SearchWordChipList";
import SearchWordList from "../components/SearchWordList";
import RecipeList from "../components/RecipeList";

const LandingPage = () => {
  const [searchWords, setSearchWords] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchWordSelections, setSearchWordSelections] = useState([]);
  const [recipes, setRecipes] = useState([]);

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

  // TODO: fix error handling
  const searchWordClickHandler = async (index) => {
    // When a search word is clicked we first create a copy of the present
    // search words and from here extract the clicked search word
    let searchWordsCopy = [...searchWords];
    const clickedSearchWord = searchWordsCopy.splice(index, 1);

    // Then we fetch recipes based on the users selection
    let recipes = await fetchRecipes(clickedSearchWord);
    console.log(recipes);

    // And finally we set state
    setSearchWords(searchWordsCopy);
    setSearchWordSelections(searchWordSelections.concat(clickedSearchWord));
    setSearchText("");
    setRecipes(recipes);
  };

  const fetchRecipes = async (clickedSearchWord) => {
    let recipes;
    try {
      recipes = await axios.get("http://localhost:5000/api/recipes");
      return recipes.data;
    } catch (error) {
      console.log(error);
    }
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
