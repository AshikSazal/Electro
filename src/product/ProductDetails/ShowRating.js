import React from "react";
import { Star, StarHalf, StarBorder } from "@mui/icons-material";

import "./ShowRating.css";

const Rating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const stars = [];
  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={i} className="yellow-star" />);
  }

  if (hasHalfStar) {
    stars.push(<StarHalf key="half" className="yellow-star" />);
  }

  for (let i = 0; i < 5 - fullStars - (hasHalfStar ? 1 : 0); i++) {
    stars.push(<StarBorder key={fullStars + i} className="yellow-star" />);
  }

  return <div>{stars}</div>;
};

export default Rating;
