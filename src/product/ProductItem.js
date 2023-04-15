import React from "react";
import { useDispatch } from "react-redux";

import Button from "../shared/FormElements/Button";
import Card from "../components/Card/Card";
import { addItemToCart } from "../store/cartSlice";
import "./ProductItem.css";

const ProductItem = (props) => {
  const dispatch = useDispatch();

  const { id, category, price } = props.item;

  const addItemHandler = () => {
    dispatch(
      addItemToCart({
        id,
        price,
      })
    );
  };

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
            <Button onClick={addItemHandler}>Add to Cart</Button>
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
