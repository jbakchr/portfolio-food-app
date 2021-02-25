import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Container, TextField } from "@material-ui/core";

const LoginPage = ({ logIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  return (
    <Container maxWidth="lg">
      <TextField
        label="Email"
        fullWidth
        autoFocus
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
          await logIn(email, password);
          history.push("/");
        }}
      >
        Log in
      </Button>
    </Container>
  );
};

export default LoginPage;
