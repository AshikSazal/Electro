import React from "react";

import Button from "../shared/FormElements/Button";
import Card from "../components/Card/Card";
import "./ProductItem.css";

const ProductItem = (props) => {
  return (
    <Card>
      <div className="hov">
        <div className="read">
          <p>
            <Button to={`/product/${props.item.category}/${props.item.id}`}>
              Read More
            </Button>
          </p>
          <p>
            <Button>Add to Cart</Button>
          </p>
        </div>
        <div key={props.item.id}>
          <img className="product--image" src={props.item.imageurl} alt="" />
          <h2>{props.item.name}</h2>
          <p className="price">{props.item.price}</p>
        </div>
      </div>
    </Card>
  );
};

export default ProductItem;
