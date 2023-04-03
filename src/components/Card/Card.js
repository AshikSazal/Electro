import React from "react";

import "./Card.css";
import { NavLink } from "react-router-dom";

export default function Card(props) {
  return (
    <div className="hov">
      <div className="read">
        <p>
          <NavLink to='/product/:productlist/:id'>Read More</NavLink>
        </p>
        <p>
          <button>Add to Cart</button>
        </p>
      </div>
      <div className="card" key={props.id}>
        <img className="product--image" src={props.url} alt="" />
        <h2>{props.name}</h2>
        <p className="price">{props.price}</p>
      </div>
    </div>
  );
}
