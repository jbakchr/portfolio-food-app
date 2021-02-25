import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Container, Toolbar, Typography } from "@material-ui/core";

import NavbarBrandButton from "./NavbarBrandButton";
import NavbarAuthButtons from "./NavbarAuthButtons";

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
      <NavbarAuthButtons />
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
