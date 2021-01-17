import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "@material-ui/core";

import Navbar from "../components/Navbar";
import SearchField from "../components/SearchField";
import SearchWordList from "../components/SearchWordList";

const LandingPage = () => {
  const [searchWords, setSearchWords] = useState([]);

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

  return (
    <Container maxWidth="lg">
      <Navbar />
      <SearchField />
      <SearchWordList searchWords={searchWords} />
    </Container>
  );
};

export default LandingPage;
