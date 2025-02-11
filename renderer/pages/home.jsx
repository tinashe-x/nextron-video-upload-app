import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Container, Typography, Box, Grid, Card, CardContent, CardMedia } from "@mui/material";
import Navbar from "../components/Navbar";
import { getVideos } from "../utils/db"; // Import IndexedDB function

export default function Home() {
  const [videos, setVideos] = useState([]);

  // Fetch Videos from IndexedDB
  useEffect(() => {
    const fetchVideos = async () => {
      const storedVideos = await getVideos();
      setVideos(storedVideos);
    };
    fetchVideos();
  }, []);

  return (
    <Container>
      <Navbar />
      <Container maxWidth="sm">
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" textAlign="center" mt={4}>
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

      {/* Video List Section */}
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Uploaded Videos
        </Typography>
        {videos.length === 0 ? (
          <Typography>No videos uploaded yet.</Typography>
        ) : (
          <Grid container spacing={3}>
            {videos.map((video, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ 
                        maxWidth: 250,  // Adjust the overall size
                        transform: "scale(0.8)", // Scale the whole card down
                        transformOrigin: "top left" // Keep scaling from top-left
                      }}>
                  {video.thumbnail ? (
                    <CardMedia
                    component="img"
                    height={400}
                    image={video.thumbnail} // Use the data URL directly
                    alt="Thumbnail"
                  />
                  ) : (
                    <Box height="140" display="flex" alignItems="center" justifyContent="center" bgcolor="#ccc">
                      <Typography>No Thumbnail</Typography>
                    </Box>
                  )}
                  <CardContent>
                    <Typography variant="h6">{video.title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {video.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Container>
  );
}