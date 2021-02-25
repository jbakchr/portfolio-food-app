import React from "react";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const NavbarAuthButtons = () => {
  return (
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

export default NavbarAuthButtons;
