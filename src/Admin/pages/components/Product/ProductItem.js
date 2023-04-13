import React from "react";

const ProductItem = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
      <h5>{props.image}</h5>
      <img
        src={`http://127.0.0.1:8000/images/${props.image}`}
        alt={props.name}
      />
    </div>
  );
};

export default ProductItem;
