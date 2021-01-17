import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "@material-ui/core";

import Navbar from "../components/Navbar";
import SearchField from "../components/SearchField";
import SearchWordList from "../components/SearchWordList";

const LandingPage = () => {
  const [searchWords, setSearchWords] = useState([]);
  const [searchText, setSearchText] = useState("");

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

  const searchWordClickHandler = (index) => {
    console.log(index);
  };

  return (
    <Container maxWidth="lg">
      <Navbar />
      <SearchField
        searchText={searchText}
        onSearchTextChange={onSearchTextChange}
      />
      <SearchWordList
        searchText={searchText}
        searchWords={searchWords}
        searchWordClickHandler={searchWordClickHandler}
      />
    </Container>
  );
};

export default LandingPage;
