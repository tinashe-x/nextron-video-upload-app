import React, { useState } from "react";
import { Button, Box, TextField, Typography, Card, CardContent, IconButton, Divider } from "@mui/material";
import StarRating from "./StarRating";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ReviewSection() {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [movieTitle, setMovieTitle] = useState("");
  const [replyText, setReplyText] = useState(""); 

  // Add a new review
  const addReview = () => {
    if (!reviewText.trim() || !movieTitle.trim()) return;
    setReviews([...reviews, { rating, text: reviewText, movieTitle, id: Date.now(), replies: [] }]);
    setReviewText("");
    setMovieTitle("");
  };

  // Edit an existing review
  const editReview = (id, newText) => {
    setReviews(reviews.map((r) => (r.id === id ? { ...r, text: newText } : r)));
  };

  // Delete a review
  const deleteReview = (id) => {
    setReviews(reviews.filter((r) => r.id !== id));
  };

  // Add a reply to a review
  const addReply = (id) => {
    if (!replyText.trim()) return;
    setReviews(
      reviews.map((r) =>
        r.id === id
          ? { ...r, replies: [...r.replies, { text: replyText, rating: 5, id: Date.now() }] }
          : r
      )
    );
    setReplyText(""); // Clear reply text after adding the reply
  };

  // Toggle reply input visibility
  const toggleReplyInput = (id) => {
    const updatedReviews = reviews.map((r) =>
      r.id === id ? { ...r, isReplyInputVisible: !r.isReplyInputVisible } : r
    );
    setReviews(updatedReviews);
  };

  return (
    <Box sx={{ padding: 3, maxWidth: 600, margin: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Write a Review
      </Typography>

      {/* Movie Title Input */}
      <TextField
        label="Video Title"
        variant="outlined"
        fullWidth
        value={movieTitle}
        onChange={(e) => setMovieTitle(e.target.value)}
        sx={{ marginY: 2 }}
      />

      {/* Rating and Review Input */}
      <StarRating rating={rating} setRating={setRating} />
      <TextField
        label="Write your review"
        variant="outlined"
        multiline
        rows={4}
        fullWidth
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        sx={{ marginY: 2 }}
      />
      <Button variant="contained" onClick={addReview} disabled={!reviewText.trim() || !movieTitle.trim()}>
        Submit Review
      </Button>
       
      <Divider sx={{ marginY: 3 }} />
      <Typography variant="h4" gutterBottom>
        Reviews
      </Typography>

      {/* Display Reviews */}
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <Card key={review.id} sx={{ marginBottom: 2 }}>
            <CardContent>
              <Typography variant="h6">{review.movieTitle}</Typography>
              <Typography variant="h6">Rating: ⭐ {review.rating}</Typography>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                {review.text}
              </Typography>

              {/* Edit/Delete Review */}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <IconButton
                  onClick={() => editReview(review.id, prompt("Edit your review", review.text) || review.text)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => deleteReview(review.id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>

              {/* Reply Button */}
              <Button
                variant="outlined"
                sx={{ marginTop: -8 }}
                onClick={() => toggleReplyInput(review.id)}
              >
                {review.isReplyInputVisible ? "Cancel Reply" : "Reply"}
              </Button>
              
              {/* Reply Input (Visible when toggled) */}
              {review.isReplyInputVisible && (
                <Box sx={{ marginTop: 2 }}>
                  <StarRating rating={5} setRating={(newRating) => setRating(newRating)} />
                  <TextField
                    label="Write your reply"
                    variant="outlined"
                    multiline
                    rows={2}
                    fullWidth
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    sx={{ marginY: 1 }}
                  />
                  <Button
                    variant="outlined"
                    onClick={() => addReply(review.id)}
                    disabled={!replyText.trim()}
                  >
                    Submit Reply
                  </Button>
                </Box>
              )}

              {/* Display Replies */}
              {review.replies.length > 0 && (
                <Box sx={{ marginTop: 2, paddingLeft: 2 }}>
                  {review.replies.map((reply) => (
                    <Card key={reply.id} sx={{ marginBottom: 1 }}>
                      <CardContent>
                        <Typography variant="body2" color="textSecondary">
                          Reply: {reply.text}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Reply Rating: ⭐ {reply.rating}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              )}
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="body2" color="textSecondary">
          No reviews yet.
        </Typography>
      )}
    </Box>
  );
}
