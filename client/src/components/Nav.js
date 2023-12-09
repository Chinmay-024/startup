import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom"; // Make sure to have react-router-dom installed

const Nav = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ flexGrow: 1 }}
          color="inherit"
          style={{ textDecoration: "none" }}
        >
          Startup App
        </Typography>
        <Button color="inherit" component={Link} to="/addstartup">
          Add Startup
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
