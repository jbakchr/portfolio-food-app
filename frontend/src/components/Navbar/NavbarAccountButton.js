import React, { useState } from "react";
import { AccountCircle } from "@material-ui/icons";
import { List, Popover, ListItem, ListItemText } from "@material-ui/core";

const NavbarAccountButton = ({ logOut }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async () => {
    await setAnchorEl(null);
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
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <List>
          <ListItem button>
            <ListItemText primary="Min profil" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Log ud" onClick={logOut} />
          </ListItem>
        </List>
      </Popover>
    </div>
  );
};

export default NavbarAccountButton;
