import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Container, Toolbar } from "@material-ui/core";

import NavbarBrandButton from "./NavbarBrandButton";
import NavbarAccountButton from "./NavbarAccountButton";
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
      <NavbarAccountButton logOut={logOut} />
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
