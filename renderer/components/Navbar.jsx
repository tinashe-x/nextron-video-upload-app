import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";

export default function Navbar() {
  return (
    <AppBar position="static" sx={{ background: "#1976D2" }}>
      <Toolbar>
        {/* Menu Icon for Mobile */}
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2, display: { sm: "none" } }}>
          <MenuIcon />
        </IconButton>

        {/* Brand Name */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Nextron Video App
        </Typography>

        {/* Navigation Links */}
        <Button color="inherit" component={Link} href="/home">
          Home
        </Button>
        <Button color="inherit" component={Link} href="/upload">
          Upload
        </Button>
        <Button color="inherit" component={Link} href="/review">
           Review
        </Button>
      </Toolbar>
    </AppBar>
  );
}
