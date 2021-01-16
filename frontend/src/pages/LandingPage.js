import React from "react";
import { Container } from "@material-ui/core";

import Navbar from "../components/Navbar";
import SearchField from "../components/SearchField";

const LandingPage = () => {
  return (
    <Container maxWidth="lg">
      <Navbar />
      <SearchField />
    </Container>
  );
};

export default LandingPage;
