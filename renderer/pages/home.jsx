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
          <Grid container spacing={2}>
            {videos.map((video, index) => {
              const videoReviews = reviews.filter((review) => review.movieId === video.id);
              const reviewCount = videoReviews.length;
              const averageRating =
                reviewCount > 0
                  ? videoReviews.reduce((sum, review) => sum + review.rating, 0) / reviewCount
                  : 0;

              return (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    sx={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {video.thumbnail ? (
                      <CardMedia
                        component="img"
                        sx={{
                          aspectRatio: "8/12",
                          width: '110%',
                          objectFit: 'contain',
                        }}
                        image={video.thumbnail}
                        alt="Thumbnail"
                      />
                    ) : (
                      <Box
                        sx={{
                          height: { xs: 150, sm: 200, md: 250 },
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bgcolor: '#ccc',
                          width: '100%',
                        }}
                      >
                        <Typography>No Thumbnail</Typography>
                      </Box>
                    )}
                    <CardContent sx={{ textAlign: 'center', width: '100%' }}>
                      <Typography variant="h6">{video.title}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {video.description}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Average Rating: {reviewCount > 0 ? averageRating.toFixed(1) : 'N/A'} |{' '}
                        {reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}
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
