import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Container, Toolbar, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

import NavbarBrandButton from "./NavbarBrandButton";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const Navbar = ({ token, logOut }) => {
  const classes = useStyles();

  const getNavbarButton = () => {
    return token ? (
      <Typography style={{ cursor: "pointer" }} onClick={logOut}>
        Logout
      </Typography>
    ) : (
      <div
        style={{
          display: "flex",
          width: "10%",
          justifyContent: "space-between",
        }}
      >
        <Typography style={{ cursor: "pointer" }}>
          <Link style={{ textDecoration: "none", color: "white" }} to="/signup">
            Sign up
          </Link>
        </Typography>
        <Typography style={{ cursor: "pointer" }}>
          <Link style={{ textDecoration: "none", color: "white" }} to="/login">
            Log in
          </Link>
        </Typography>
      </div>
    );
  };

  return (
    <div className={classes.root}>
      <AppBar>
        <Container maxWidth="lg">
          <Toolbar>
            <NavbarBrandButton />
            {getNavbarButton()}
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </div>
  );
};

export default Navbar;
