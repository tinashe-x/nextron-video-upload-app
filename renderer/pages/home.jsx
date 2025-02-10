import React from "react";
import Link from "next/link";
import { Button, Container, Typography, Box } from "@mui/material";
import Navbar from "../components/Navbar";

export default function Home() {
  
  return (
    <Container>
    <Navbar />
    <Container maxWidth="sm">
      <Box 
        display="flex" 
        flexDirection="column" 
        justifyContent="center" 
        alignItems="center" 
        height="100vh"
        textAlign="center"
      >
        <Typography variant="h4" gutterBottom>
          Welcome to Nextron Video App
        </Typography>
        <Link href="/upload" passHref>
          <Button variant="contained" color="primary" size="large">
            Go to Upload Page
          </Button>
        </Link>
      </Box>
    </Container>
    </Container>
  );
}
