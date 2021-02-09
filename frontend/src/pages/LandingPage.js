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

  const searchWordClickHandler = async (index) => {
    // When a search word is clicked we first create a copy of the present
    // search words and from here extract the clicked search word
    let searchWordsCopy = [...searchWords];
    const clickedSearchWord = searchWordsCopy.splice(index, 1);

    // Then we fetch recipes based on the users selection
    let recipes = await fetchRecipes(clickedSearchWord);

    // And finally we set state
    setSearchWords(searchWordsCopy);
    setSearchWordSelections(searchWordSelections.concat(clickedSearchWord));
    setSearchText("");
    setRecipes(recipes);
  };

  const fetchRecipes = async (clickedSearchWord) => {
    // When fetching recipes we first map over each of the present search word
    // selections and concatenate the clicked search word
    const presentSearchWordSelections = [...searchWordSelections]
      .map((el) => el.search_word)
      .concat(clickedSearchWord[0].search_word);

    // And then we send our request to the backend with the selections as a string
    try {
      const { data } = await axios.get("http://localhost:5000/api/recipes", {
        params: {
          q: presentSearchWordSelections,
        },
      });
      return data;
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
      <RecipeList recipes={recipes} />
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
