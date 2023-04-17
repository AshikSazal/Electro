import React, { useEffect, useState } from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductItem from "../../product/ProductItem";
import { responsive } from "../../data/data";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import ErrorModal from "../Error/ErrorModal";
import "./MultiCarousel.css";

const MultiCarousel = () => {
  const [product, setProduct] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const responseData = await sendRequest(
          "http://127.0.0.1:8000/api/product/fetch/all",
          "GET",
          null,
        );
        setProduct(responseData.product);
      } catch (err) {}
    };
    fetchProduct();
  }, [setProduct, sendRequest]);
  const productList = product.map((item) => <ProductItem key={item.id} item={item} />);

  return (
    <div className="root">
      {isLoading && <LoadingSpinner asOverlay />}
    <ErrorModal error={error} onClear={clearError} />
      <h1>Product</h1>
      <Carousel autoPlay={true} infinite={true} responsive={responsive}>
        {productList}
      </Carousel>
    </div>
  );
};

export default MultiCarousel;
