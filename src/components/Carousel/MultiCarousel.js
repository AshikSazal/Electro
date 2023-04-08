import React from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductItem from "../../product/ProductItem";
import { productData, responsive } from "../../data/data";
import "./MultiCarousel.css";

const MultiCarousel = () => {
  const product = productData.map((item) => <ProductItem key={item.id} item={item} />);

  return (
    <div className="root">
      <h1>Product</h1>
      <Carousel autoPlay={true} infinite={true} responsive={responsive}>
        {product}
      </Carousel>
    </div>
  );
};

export default MultiCarousel;
