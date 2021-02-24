import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Container, Toolbar, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar>
        <Container maxWidth="lg">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              VasGo
            </Typography>
            <Typography
              style={{ cursor: "pointer" }}
              onClick={() => console.log("Going to sign up")}
            >
              Sign up / Login
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </div>
  );
};

export default Navbar;
