import React, { useState } from "react";

interface StarRatingProps {
  rating: number;
  setRating: (rating: number) => void;
}

export default function StarRating({ rating, setRating }: StarRatingProps) {
  const [hover, setHover] = useState(0);

  return (
    <div style={{ display: "flex", gap: "5px" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{
            fontSize: "24px",
            cursor: "pointer",
            color: star <= (hover || rating) ? "#FFD700" : "#CCC",
          }}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          onClick={() => setRating(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
}
