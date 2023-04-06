import React from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card from "../Card/Card";
import { productData, responsive } from "../../data/data";
import "./MultiCarousel.css";

const MultiCarousel = () => {
  const product = productData.map((item) => <Card key={item.id} item={item} />);

  return (
    <div className="root">
      <h1>Product</h1>
      <Carousel infinite={true} responsive={responsive}>
        {product}
      </Carousel>
    </div>
  );
};

export default MultiCarousel;
