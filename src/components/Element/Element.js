import React from "react";

import "./Element.css";

const Element = () => {
  return (
    <div className="elementor">
      <div className="elemetor-list">
        <div className="shipping">
          <h1>Free shipping</h1>
          <h3>Above 5$ only</h3>
        </div>
        <div className="savings">
          <h1>Huge Savings</h1>
          <h3>At Lowest Price</h3>
        </div>
        <div className="returns">
          <h1>Easy Returns</h1>
          <h3>No Questions Asked</h3>
        </div>
      </div>
    </div>
  );
};

export default Element;
