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
      console.log("fetched search words:", data);
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
    let presentSearchWordSelections = [...searchWordSelections].concat(
      clickedSearchWord
    );

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
    // Extract chip selection and deleted chip
    const chipSelections = [...searchWordSelections];
    const deletedChip = chipSelections.splice(index, 1);

    // Fetch recipes
    let recipes = [];
    if (chipSelections.length > 0) {
      try {
        const { data } = await axiosInstance.get("recipes", {
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
    setSearchWords([...searchWords].concat(deletedChip));
    setSearchText("");
    setRecipes(recipes);
    setSearchWordSelections(chipSelections);
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
      <SearchWordList
        searchText={searchText}
        searchWords={searchWords}
        searchWordClickHandler={searchWordClickHandler}
      />
      <RecipeList searchText={searchText} recipes={recipes} />
    </Container>
  );
};

export default LandingPage;
