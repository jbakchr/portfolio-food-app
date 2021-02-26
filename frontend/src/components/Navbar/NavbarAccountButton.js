import React, { useState } from "react";
import { AccountCircle } from "@material-ui/icons";
import { Popover, Typography } from "@material-ui/core";

const NavbarAccountButton = ({ logOut }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async () => {
    await setAnchorEl(null);
    // logOut();
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <AccountCircle
        style={{ cursor: "pointer" }}
        aria-describedby={id}
        onClick={handleClick}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Typography>The content of the Popover.</Typography>
      </Popover>
    </div>
  );
};

export default NavbarAccountButton;
