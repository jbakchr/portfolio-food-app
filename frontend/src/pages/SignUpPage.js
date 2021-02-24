import React, { useState } from "react";
import { Container, TextField, Button } from "@material-ui/core";

const SignUpPage = ({ signUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Container maxWidth="lg">
      <TextField
        label="Email"
        fullWidth
        type="email"
        onChange={(event) => setEmail(event.target.value)}
      />
      <TextField
        label="Password"
        fullWidth
        onChange={(event) => setPassword(event.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => signUp(email, password)}
      >
        Sign up
      </Button>
    </Container>
  );
};

export default SignUpPage;
