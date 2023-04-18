import React, { useEffect, useState } from "react";

import ProductItem from "./ProductItem";
import { useHttpClient } from "../shared/hooks/http-hook";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import ErrorModal from "../components/Error/ErrorModal";
import './ProductList.css';

const MultiCarousel = () => {
  const [product, setProduct] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const responseData = await sendRequest(
          "http://127.0.0.1:8000/api/product/fetch/all",
          "GET",
          null
        );
        setProduct(responseData.product);
      } catch (err) {}
    };
    fetchProduct();
  }, [setProduct, sendRequest]);
  const productList = product.map((item) => (
    <ProductItem key={item.id} item={item} />
  ));

  return (
    <div className="product-list">
      {isLoading && <LoadingSpinner asOverlay />}
      <ErrorModal error={error} onClear={clearError} />
      {productList}
    </div>
  );
};

export default MultiCarousel;
