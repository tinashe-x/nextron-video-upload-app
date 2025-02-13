import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Content inside the Drawer (mobile menu)
  const drawerContent = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Nextron Video App
      </Typography>
      <Divider />
      <List>
        <ListItem button component={Link} href="/home">
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} href="/upload">
          <ListItemText primary="Upload" />
        </ListItem>
        <ListItem button component={Link} href="/review">
          <ListItemText primary="Review" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" sx={{ background: "#1976D2" }}>
        <Toolbar>
          {/* Menu Icon (visible only on small screens) */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display: { sm: "none" } }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>

          {/* Brand Name */}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Nextron Video App
          </Typography>

          {/* Nav Links (hidden on small screens) */}
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button color="inherit" component={Link} href="/home">
              Home
            </Button>
            <Button color="inherit" component={Link} href="/upload">
              Upload
            </Button>
            <Button color="inherit" component={Link} href="/review">
              Review
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer for mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true // Better mobile performance
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 }
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}
