import React from "react";

import "./CartItem.css";
import { Button } from "@mui/material";

const CartItem = (props) => {
  return (
    <li className="cart-item">
      <img
        src={`http://127.0.0.1:8000/images/${props.product.image_name}`}
        alt={props.name}
      />
      <ul className="details">
        <li>{props.product.name}</li>
        <li>x{props.cart.quantity}</li>
      </ul>
      <ul className="actions">
        <li>
          &#2547;{props.cart.price}
          <span>(&#2547;{props.product.price}/item)</span>
        </li>
        <li>
          <Button><h2>+</h2></Button>
          <Button><h2>-</h2></Button>
        </li>
      </ul>
    </li>
  );
};

export default CartItem;
