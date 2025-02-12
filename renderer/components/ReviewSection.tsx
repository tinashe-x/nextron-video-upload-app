// renderer/components/ReviewSection.tsx
import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import {
  getVideos,
  saveReview,
  getReviews,
  addReply
  // (Other functions like editReview, deleteReview, etc. can remain imported if needed)
} from "../utils/db";

// Define a props interface for the review section.
interface ReviewSectionProps {
  videoId?: string; // Optional video ID. If provided, this review section is pre-associated with that movie.
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ videoId: initialVideoId }) => {
  // State for movies (uploaded videos)
  const [movies, setMovies] = useState<any[]>([]);
  const [selectedMovieId, setSelectedMovieId] = useState<string>(initialVideoId || "");
  const [selectedMovieTitle, setSelectedMovieTitle] = useState<string>("");

  // State for the new review
  const [rating, setRating] = useState<number>(5);
  const [reviewText, setReviewText] = useState("");

  // State for reviews (all reviews from Firestore)
  const [reviews, setReviews] = useState<any[]>([]);

  // For reply functionality: store reply text and toggle reply input per review
  const [replyTexts, setReplyTexts] = useState<{ [key: string]: string }>({});
  const [showReplyInput, setShowReplyInput] = useState<{ [key: string]: boolean }>({});

  // State for sort option
  const [sortOption, setSortOption] = useState<string>("mostRecent");

  // Fetch the list of movies (uploaded videos) on mount
  useEffect(() => {
    const fetchMovies = async () => {
      const moviesData = await getVideos();
      setMovies(moviesData);
      if (!initialVideoId && moviesData.length > 0) {
        // Default to the first movie if no videoId prop is provided.
        setSelectedMovieId(moviesData[0].id);
        setSelectedMovieTitle(moviesData[0].title);
      } else if (initialVideoId) {
        const movie = moviesData.find((m: any) => m.id === initialVideoId);
        if (movie) {
          setSelectedMovieTitle(movie.title);
        }
      }
    };
    fetchMovies();
  }, [initialVideoId]);

  // Fetch reviews (all reviews in the "reviews" collection)
  const fetchReviews = async () => {
    const reviewsData = await getReviews();
    setReviews(reviewsData);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Handle submitting a new review.
  const handleReviewSubmit = async () => {
    if (!selectedMovieId || !reviewText.trim()) return;
    const reviewData = {
      movieId: selectedMovieId,
      movieTitle: selectedMovieTitle,
      rating,
      text: reviewText,
      createdAt: new Date().toISOString(),
      replies: [] // initialize with no replies
    };
    await saveReview(reviewData);
    setReviewText("");
    fetchReviews(); // refresh the review list
  };

  // Handle submitting a reply for a specific review.
  const handleReplySubmit = async (reviewId: string) => {
    const replyText = replyTexts[reviewId];
    if (!replyText || !replyText.trim()) return;
    // Create a reply object with a unique id.
    const replyData = {
      id: new Date().getTime().toString(), // simple unique id based on timestamp
      text: replyText,
      createdAt: new Date().toISOString()
    };
    await addReply(reviewId, replyData);
    setReplyTexts(prev => ({ ...prev, [reviewId]: "" }));
    setShowReplyInput(prev => ({ ...prev, [reviewId]: false }));
    fetchReviews();
  };

  // Filter reviews for the selected movie.
  const filteredReviews = reviews.filter(review => review.movieId === selectedMovieId);

  // Sort the filtered reviews based on the sort option.
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortOption === "mostRecent") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sortOption === "oldest") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    } else if (sortOption === "highestRating") {
      return b.rating - a.rating;
    } else if (sortOption === "lowestRating") {
      return a.rating - b.rating;
    } else {
      return 0;
    }
  });

  return (
    <Box mt={4}>
      <Typography variant="h6">Submit a Review</Typography>
      
      {/* If no videoId was provided via props, allow the user to select one */}
      {!initialVideoId && (
        <Box mt={2}>
          <FormControl fullWidth>
            <InputLabel id="movie-select-label">Movie</InputLabel>
            <Select
              labelId="movie-select-label"
              value={selectedMovieId}
              label="Movie"
              onChange={(e) => {
                const movieId = e.target.value as string;
                setSelectedMovieId(movieId);
                const movie = movies.find(m => m.id === movieId);
                setSelectedMovieTitle(movie ? movie.title : "");
              }}
            >
              {movies.map((movie) => (
                <MenuItem key={movie.id} value={movie.id}>
                  {movie.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}

      {/* Input for rating */}
      <Box mt={2}>
        <TextField
          label="Rating (1-5)"
          type="number"
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value))}
          inputProps={{ min: 1, max: 5 }}
          fullWidth
        />
      </Box>

      {/* Input for review text */}
      <Box mt={2}>
        <TextField
          label="Your Review"
          multiline
          rows={3}
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          fullWidth
        />
      </Box>

      {/* Submit review button */}
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={handleReviewSubmit}>
          Submit Review
        </Button>
      </Box>

      {/* Filter / Sort Options */}
      <Box mt={4}>
        <FormControl fullWidth>
          <InputLabel id="sort-select-label">Sort Reviews</InputLabel>
          <Select
            labelId="sort-select-label"
            value={sortOption}
            label="Sort Reviews"
            onChange={(e) => setSortOption(e.target.value as string)}
          >
            <MenuItem value="mostRecent">Most Recent</MenuItem>
            <MenuItem value="oldest">Oldest</MenuItem>
            <MenuItem value="highestRating">Highest Rating</MenuItem>
            <MenuItem value="lowestRating">Lowest Rating</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* List sorted reviews for the selected movie */}
      <Box mt={4}>
        <Typography variant="h6">Reviews for {selectedMovieTitle}</Typography>
        {sortedReviews.length === 0 ? (
          <Typography>No reviews yet.</Typography>
        ) : (
          sortedReviews.map(review => (
            <Box key={review.id} mt={2} p={2} border="1px solid #ccc" borderRadius={2}>
              <Typography variant="subtitle2">
                {review.movieTitle} - Rating: {review.rating}
              </Typography>
              <Typography variant="body1">{review.text}</Typography>
              <Typography variant="caption" color="textSecondary">
                {new Date(review.createdAt).toLocaleString()}
              </Typography>

              {/* Reply button */}
              <Box mt={1}>
                <Button
                  variant="text"
                  size="small"
                  onClick={() =>
                    setShowReplyInput(prev => ({ ...prev, [review.id]: !prev[review.id] }))
                  }
                >
                  {showReplyInput[review.id] ? "Cancel Reply" : "Reply"}
                </Button>
              </Box>

              {/* Reply input (if toggled) */}
              {showReplyInput[review.id] && (
                <Box mt={1} display="flex" gap={1}>
                  <TextField
                    label="Your Reply"
                    value={replyTexts[review.id] || ""}
                    onChange={(e) =>
                      setReplyTexts({ ...replyTexts, [review.id]: e.target.value })
                    }
                    fullWidth
                  />
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleReplySubmit(review.id)}
                  >
                    Submit Reply
                  </Button>
                </Box>
              )}

              {/* Display replies, if any */}
              {review.replies && review.replies.length > 0 && (
                <Box mt={2} ml={2}>
                  <Typography variant="subtitle2">Replies:</Typography>
                  {review.replies.map((reply: any, index: number) => (
                    <Box key={index} mt={1} p={1} border="1px solid #ddd" borderRadius={1}>
                      <Typography variant="body2">{reply.text}</Typography>
                      <Typography variant="caption" color="textSecondary">
                        {new Date(reply.createdAt).toLocaleString()}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};

export default ReviewSection;
