// renderer/pages/home.jsx
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Container, Typography, Box, Grid, Card, CardContent, CardMedia } from "@mui/material";
import Navbar from "../components/Navbar";
import { getVideos, getReviews } from "../utils/db";

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [reviews, setReviews] = useState([]);

  // Fetch Videos and Reviews from Firestore
  useEffect(() => {
    const fetchData = async () => {
      const storedVideos = await getVideos();
      const storedReviews = await getReviews();
      setVideos(storedVideos);
      setReviews(storedReviews);
    };
    fetchData();
  }, []);

  return (
    <Container>
      <Navbar />
      <Container maxWidth="sm">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          mt={4}
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

      {/* Video List Section */}
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Uploaded Videos
        </Typography>
        {videos.length === 0 ? (
          <Typography>No videos uploaded yet.</Typography>
        ) : (
          <Grid container spacing={3}>
            {videos.map((video, index) => {
              // Filter reviews for the current video using its id
              const videoReviews = reviews.filter(review => review.movieId === video.id);
              const reviewCount = videoReviews.length;
              const averageRating =
                reviewCount > 0
                  ? videoReviews.reduce((sum, review) => sum + review.rating, 0) / reviewCount
                  : 0;

              return (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    sx={{
                      maxWidth: 250, // Adjust the overall size
                      transform: "scale(0.8)", // Scale the whole card down
                      transformOrigin: "top left", // Keep scaling from top-left
                    }}
                  >
                    {video.thumbnail ? (
                      <CardMedia
                        component="img"
                        height={400}
                        image={video.thumbnail} // Use the data URL directly
                        alt="Thumbnail"
                      />
                    ) : (
                      <Box
                        height="140"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        bgcolor="#ccc"
                      >
                        <Typography>No Thumbnail</Typography>
                      </Box>
                    )}
                    <CardContent>
                      <Typography variant="h6">{video.title}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {video.description}
                      </Typography>
                      {/* Display average rating and review count */}
                      <Typography variant="body2" color="textSecondary">
                        Average Rating:{" "}
                        {reviewCount > 0 ? averageRating.toFixed(1) : "N/A"} | {reviewCount}{" "}
                        {reviewCount === 1 ? "review" : "reviews"}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Container>
    </Container>
  );
}
