import React, { useState, useEffect } from "react";

import { useHttpClient } from "../../../../shared/hooks/http-hook";
import { useAuth } from "../../../../shared/hooks/auth-hook";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import AdminProductItem from "./AdminProductItem";
import ErrorModal from "../../../../components/Error/ErrorModal";
import Pagination from "../../../../shared/Pagination/Pagination";
import "./AdminProductList.css";

const AdminProductList = () => {
  const { token, role } = useAuth();
  const [product, setProduct] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage, setProductPerPage] = useState(8);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const responseData = await sendRequest(
          "http://127.0.0.1:8000/api/product/admin/fetch",
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

  const editProductHandler = async (id, value, type) => {
    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("value", value);
      formData.append("type", type);
      await sendRequest(
        "http://127.0.0.1:8000/api/product/edit",
        "POST",
        formData,
        {
          Authorization: "Bearer " + token + "|@|" + role,
        }
      );
    } catch (err) {}
    setProduct((prevProducts) => {
      const updatedProduct = [...prevProducts];
      const index = updatedProduct.findIndex((prod) => prod.id === id);
      updatedProduct[index][type] = value;
      return updatedProduct;
    });
  };

  const productDeletedHandler = (deletedProductId) => {
    setProduct((prevProducts) =>
      prevProducts.filter((prod) => prod.id !== deletedProductId)
    );
  };

  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProduct = product.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
            {currentProduct.map((prod) => (
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
                editProductHandler={editProductHandler}
              />
            ))}
          </tbody>
        </table>
        <Pagination
          productPerPage={productPerPage}
          totalProduct={product.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </>
  );
};

export default AdminProductList;
