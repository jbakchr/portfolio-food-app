import React, { useState } from "react";
import { Container, TextField, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const SignUpPage = ({ signUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

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
        onClick={async () => {
          await signUp(email, password);
          history.push("/");
        }}
      >
        Sign up
      </Button>
    </Container>
  );
};

export default SignUpPage;
