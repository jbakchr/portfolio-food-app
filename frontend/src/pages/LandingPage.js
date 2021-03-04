import React, { useState } from "react";
import { Container } from "@material-ui/core";

import SearchField from "../components/SearchField";
import SearchWordChipList from "../components/SearchWordChipList";
import SearchWordList from "../components/SearchWordList";
import RecipeList from "../components/RecipeList";

import axiosInstance from "../utils/axios-instance";

const LandingPage = ({ userId, searchWords, addSearchWords }) => {
  const [searchText, setSearchText] = useState("");
  const [searchWordSelections, setSearchWordSelections] = useState([]);
  const [recipes, setRecipes] = useState([]);

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
    addSearchWords(searchWordsCopy);
    setSearchWordSelections(searchWordSelections.concat(clickedSearchWord));
    setSearchText("");
    setRecipes(recipes);
  };

  const fetchRecipes = async (clickedSearchWord) => {
    let presentSearchWordSelections = [...searchWordSelections].concat(
      clickedSearchWord
    );

    try {
      const { data } = await axiosInstance.get(`recipes/${userId}`, {
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
    // Extract chip selection and deleted chip
    const chipSelections = [...searchWordSelections];
    const deletedChip = chipSelections.splice(index, 1);

    // Fetch recipes
    let recipes = [];
    if (chipSelections.length > 0) {
      try {
        const { data } = await axiosInstance.get(`recipes/${userId}`, {
          params: {
            q: JSON.stringify(chipSelections),
          },
        });
        recipes = data;
      } catch (error) {
        console.log(error);
      }
    }

    // Set state
    addSearchWords([...searchWords].concat(deletedChip));
    setSearchText("");
    setRecipes(recipes);
    setSearchWordSelections(chipSelections);
  };

  return (
    <Container maxWidth="lg">
      <SearchField
        searchText={searchText}
        onSearchTextChange={onSearchTextChange}
      />
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
