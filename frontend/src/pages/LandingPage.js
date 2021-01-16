import React, { useEffect } from "react";
import axios from "axios";
import { Container } from "@material-ui/core";

import Navbar from "../components/Navbar";
import SearchField from "../components/SearchField";

const LandingPage = () => {
  useEffect(() => {
    fetchSearchWords();
  }, []);

  const fetchSearchWords = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/search-words"
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Navbar />
      <SearchField />
    </Container>
  );
};

export default LandingPage;
