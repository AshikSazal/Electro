import React, { useState, useEffect } from "react";

import { useHttpClient } from "../../../../shared/hooks/http-hook";
import { useAuth } from "../../../../shared/hooks/auth-hook";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import AdminProductItem from "./AdminProductItem";
import ErrorModal from "../../../../components/Error/ErrorModal";
import "./AdminProductList.css";

const AdminProductList = () => {
  const { token, role } = useAuth();
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
            Authorization: "Bearer " + token + "|@|" + role,
          }
        );
        setProduct(responseData.product);
      } catch (err) {}
    };
    fetchProduct();
  }, [setProduct, sendRequest, token, role]);

  const productDeletedHandler = (deletedProductId) => {
    setProduct(prevProducts => prevProducts.filter(prod => prod.id !== deletedProductId));
  };

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      <ErrorModal error={error} onClear={clearError} />
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
              <AdminProductItem
                key={prod.id}
                id={prod.id}
                name={prod.name}
                image={prod.image_name}
                brand={prod.brand}
                category={prod.category}
                price={prod.price}
                quantity={prod.quantity}
                description={prod.description}
                onDelete={productDeletedHandler}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminProductList;
