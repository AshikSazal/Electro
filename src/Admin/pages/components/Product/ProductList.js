import React, { useState, useEffect } from "react";

import { useHttpClient } from "../../../../shared/hooks/http-hook";
import { useAuth } from "../../../../shared/hooks/auth-hook";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import ProductItem from "./ProductItem";

const ProductList = () => {
  const { token } = useAuth();
  const [product, setProduct] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const responseData = await sendRequest(
          "http://127.0.0.1:8000/api/product/fetch",
          "GET",
          null,
          {
            Authorization: "Bearer " + token,
          }
        );
        setProduct(responseData.product);
        console.log(responseData.product);
      } catch (err) {}
    };
    fetchProduct();
  }, [setProduct, sendRequest, token]);

  return (
    <div>
      {isLoading && <LoadingSpinner asOverlay />}
      {product.map((prod) => (
        <ProductItem name={prod.name} />
      ))}
    </div>
  );
};

export default ProductList;
