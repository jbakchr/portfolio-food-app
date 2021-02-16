import React, { useEffect, useState } from "react";
import { Container } from "@material-ui/core";

import Navbar from "../components/Navbar";
import SearchField from "../components/SearchField";
import SearchWordChipList from "../components/SearchWordChipList";
import SearchWordList from "../components/SearchWordList";
import RecipeList from "../components/RecipeList";

import axiosInstance from "../utils/axios-instance";

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
      const { data } = await axiosInstance.get("search-words");
      console.log("data", data);
      setSearchWords(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onSearchTextChange = (text) => {
    setSearchText(text);
  };

  const searchWordClickHandler = async (index) => {
    // Extract clicked search word
    let searchWordsCopy = [...searchWords];
    const clickedSearchWord = searchWordsCopy.splice(index, 1);

    // Fetch recipes
    let recipes = await fetchRecipes(clickedSearchWord);

    // Set state
    setSearchWords(searchWordsCopy);
    setSearchWordSelections(searchWordSelections.concat(clickedSearchWord));
    setSearchText("");
    setRecipes(recipes);
  };

  const fetchRecipes = async (clickedSearchWord) => {
    console.log(clickedSearchWord);
    // When fetching recipes we first map over each of the present search word
    // selections and concatenate the clicked search word
    // const presentSearchWordSelections = [...searchWordSelections]
    //   .map((el) => el.search_word)
    //   .concat(clickedSearchWord[0].search_word);

    let presentSearchWordSelections = [...searchWordSelections].concat(
      clickedSearchWord
    );

    // And then we send our request to the backend with the selections as a string
    try {
      const { data } = await axiosInstance.get("recipes", {
        params: {
          q: JSON.stringify(presentSearchWordSelections),
        },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const chipDeleteHandler = async (index) => {
    // When a search word chip is clicked for deletion then we first remove
    // the clicked chip from the present selection of search word chips
    const chipSelections = [...searchWordSelections];
    const deletedChip = chipSelections.splice(index, 1);

    // Then we check if any chips is left and if so fetch new recipes
    let recipes = [];
    if (chipSelections.length > 0) {
      try {
        const { data } = await axiosInstance.get("recipes", {
          params: {
            q: chipSelections.map((el) => el.search_word),
          },
        });
        recipes = data;
      } catch (error) {
        console.log(error);
      }
    }

    // Finally we:
    //  - transfer the "deleted" chip back to the list of search words
    //  - clear the search field
    //  - set the new array of recipes
    //  - set the new array of search word chips
    setSearchWords([...searchWords].concat(deletedChip));
    setSearchText("");
    setRecipes(recipes);
    setSearchWordSelections(chipSelections);
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
      <SearchWordChipList
        searchWordSelections={searchWordSelections}
        chipDeleteHandler={chipDeleteHandler}
      />
      {conditionalListRendering()}
    </Container>
  );
};

export default LandingPage;
