import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    fontWeight: "bold",
  },
}));

const NavbarBrandButton = ({ title }) => {
  const classes = useStyles();

  return (
    <Typography variant="h6" className={classes.title}>
      <Link
        style={{
          textDecoration: "none",
          cursor: "pointer",
          color: "white",
        }}
        to="/"
      >
        VasGo
      </Link>
    </Typography>
  );
};

export default NavbarBrandButton;
