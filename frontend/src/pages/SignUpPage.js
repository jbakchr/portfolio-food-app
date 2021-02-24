import React from "react";
import { Container, TextField, Button } from "@material-ui/core";

const SignUpPage = () => {
  return (
    <Container maxWidth="lg">
      <TextField label="Email" fullWidth />
      <TextField label="Password" fullWidth />
      <Button variant="contained" color="primary">
        Sign up
      </Button>
    </Container>
  );
};

export default SignUpPage;
