import React, { useState, useEffect } from "react";

import { useHttpClient } from "../../../../shared/hooks/http-hook";
import { useAuth } from "../../../../shared/hooks/auth-hook";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import ProductItem from "./ProductItem";
import "./ProductList.css";

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
      } catch (err) {}
    };
    fetchProduct();
  }, [setProduct, sendRequest, token]);

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quanity</th>
              <th>Description</th>
              <th colSpan={2}>Action</th>
            </tr>
          </thead>
          <tbody>
            {product.map((prod) => (
              <ProductItem
              key={prod.id}
                name={prod.name}
                image={prod.image_name}
                brand={prod.brand}
                category={prod.category}
                price={prod.price}
                quantity={prod.quantity}
                description={prod.description}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductList;
