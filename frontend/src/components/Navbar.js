import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Container, Toolbar, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
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
      <Typography style={{ cursor: "pointer" }}>
        <Link style={{ textDecoration: "none", color: "white" }} to="/signup">
          Sign up / Login
        </Link>
      </Typography>
    );
  };

  return (
    <div className={classes.root}>
      <AppBar>
        <Container maxWidth="lg">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              VasGo
            </Typography>
            {getNavbarButton()}
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </div>
  );
};

export default Navbar;
