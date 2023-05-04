import { Rating } from "@mui/material";
import React, { useState } from "react";

const GiveRating = () => {
  const [value, setValue] = useState(0);

  const handleRatingChange = (newValue) => {
    setValue(newValue);
    submitRating(newValue);
  };

  const submitRating = (newValue) => {
    // Do something with the new rating value
    console.log("Rating submitted:", newValue);
  };

  return (
    <div>
      <Rating
        name="half-rating"
        defaultValue={0}
        precision={0.5}
        value={value}
        onChange={handleRatingChange}
      />
    </div>
  );
};

export default GiveRating;

// import React, { useState } from "react";
// import { Star, StarHalf, StarBorder } from "@mui/icons-material";

// const Rating = () => {
//   const [rating, setRating] = useState(0);

//   const handleMouseOver = (value) => {
//     setRating(value);
//   };

//   const handleMouseLeave = () => {
//     setRating(0);
//   };

//   const handleClick = (value) => {
//     console.log(`Clicked ${value} stars`);
//   };

//   return (
//     <div className="rating">
//       {[...Array(5)].map((star, index) => {
//         const value = index + 1;
//         return (
//           <span
//             key={value}
//             onMouseOver={() => handleMouseOver(value)}
//             onMouseLeave={handleMouseLeave}
//             onClick={() => handleClick(value)}
//           >
//             {rating >= value ? (
//               <Star className="yellow-star" />
//             ) : (
//               <StarBorder className="white-star" />
//             )}
//           </span>
//         );
//       })}
//       {rating !== 0 && <span className="rating-value">{rating}</span>}
//     </div>
//   );
// };

// export default Rating;
