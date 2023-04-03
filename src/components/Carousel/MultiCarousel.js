import React from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card from '../Card/Card';
import { productData, responsive } from "../../data/data";
import './MultiCarousel.css';

const MultiCarousel = () => {
  const product = productData.map((item) => (
    <Card
      key={item.id}
      name={item.name}
      url={item.imageurl}
      price={item.price}
      description={item.description}
    />
  ));

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
